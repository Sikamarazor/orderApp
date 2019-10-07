import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OperationsService } from '../service/operations.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
declare var require: any;
const fileUpload = require('fuctbase64');
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styleUrls: ['./viewitem.component.css']
})
export class ViewitemComponent implements OnInit {
  loggedIn: boolean;
  uid: any;
  desc: any;
  name: any;
  file: any;
  fileResult: any;
  fooditem: any;
  storeCart: Array<any>;
  count: any;
  sumPrice: any;
  quantity: any;
  oldQuantity: any;
  oldPrice: any;
  userType: any;

  constructor(private router: Router, private operationsService: OperationsService, private route: ActivatedRoute
    , private afd: AngularFireDatabase, private afs: AngularFirestore) {
      this.storeCart = [];
    this.loggedIn = false;
    this.count = 0;
    this.sumPrice = 0;
    this.quantity = 0;
    this.oldPrice = 0;
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.fooditem = JSON.parse(params['fooditem']);
      console.log(this.uid);
      this.operationsService.getProfile(this.uid).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.loggedIn = true;
          this.userType = data.type;
        } else {
          this.loggedIn = false;
        }
      });

      const unsubItems = this.operationsService.getStoredItems(this.uid).subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.quantity = this.quantity + data[i].quantity;
          this.sumPrice = this.sumPrice + data[i].totPrice;
          console.log(this.sumPrice);
        }
        unsubItems.unsubscribe();
      });

      const unsubcart = this.operationsService.searchOldFromCart(this.uid, this.fooditem.foodUrl).subscribe(data => {
        console.log(data);
        if (data.length === 0) {
          this.oldQuantity = data.length;
          this.oldPrice = 0;
          unsubcart.unsubscribe();
        } else {
          this.oldQuantity = data[0].quantity;
          this.oldPrice = data[0].totPrice;
          unsubcart.unsubscribe();
        }
      });
    });
    $(document).ready(function () {

      // $('#sidebar').mCustomScrollbar({
      //   theme: 'minimal'
      // });

      $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar').toggleClass('active');
        // close dropdowns
        $('.collapse.in').toggleClass('in');
        // and also adjust aria-expanded attributes we use for the open/closed arrows
        // in our CSS
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });

    });
   }
  goHome() {
    this.router.navigate(['/home']);
  }
  Addtocart() {
    if (!this.uid) {
      alert('Please login to add to cart');

      this.router.navigate(['/login']);
    } else {

      this.sumPrice = this.sumPrice + parseFloat(this.fooditem.price);

      const unsub = this.operationsService.searchFromCart(this.uid, this.fooditem.foodUrl).subscribe(data => {
        console.log(data);
        unsub.unsubscribe();
        if (data.length === 0) {
          this.oldQuantity = this.oldQuantity + 1;
          console.log(this.oldQuantity);
          this.oldPrice = this.oldPrice + parseFloat(this.fooditem.price);
          this.quantity = this.quantity + 1;
          this.afs.collection('/storecart/')
            .doc(this.uid)
            .collection('/cart')
            .add({
              name: this.fooditem.name,
              foodUrl: this.fooditem.foodUrl,
              desc: this.fooditem.desc,
              quantity: this.oldQuantity,
              totPrice: this.oldPrice
            }).then(dat => {
              unsub.unsubscribe();
            });
        } else {

          this.sumPrice = this.sumPrice + parseFloat(this.fooditem.price);
          this.oldQuantity = this.oldQuantity + 1;
          this.oldPrice = this.oldPrice + parseFloat(this.fooditem.price);
          this.quantity = this.quantity + 1;
          this.afs.collection('/storecart/')
          .doc(this.uid)
          .collection('/cart')
          .doc(data[0].payload.doc.id)
          .set({
            name: this.fooditem.name,
            foodUrl: this.fooditem.foodUrl,
            desc: this.fooditem.desc,
            quantity: this.oldQuantity,
            totPrice: this.oldPrice
          }).then(dat => {
            unsub.unsubscribe();
          });
        }
      });
      this.count = this.count + 1;
      console.log(this.sumPrice);
      console.log(this.count);
      // const storeCarts = [];

      // storeCarts.push({
      //   name: this.fooditem.name,
      //   foodUrl: this.fooditem.foodUrl,
      //   desc: this.fooditem.desc,
      //   quantity: this.count,
      //   totPrice: this.sumPrice
      // });
      // this.quantity = storeCarts[0].quantity;
      // console.log(this.quantity);
      // // this.storeCart.push({
      // //   name: this.fooditem.name,
      // //   quatity: this.count,
      // //   price: this.sumPrice
      // // });
      // console.log(storeCarts);
    }
  }

  cardUpload(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);

    const result = fileUpload(event);
    result.then(data => {
      console.log(data);
      this.fileResult = data.base64;
      console.log(this.fileResult);
    });
  }

  addFoodIcon() {
    this.afd.database
      .ref('/fooditems')
      .push({
        name: this.name,
        desc: this.desc
      }).then(data => {
        console.log(data);
        this.operationsService.uploadFoodImage(data.key, this.file);

        alert('Successfully added');
      });
  }
  additem() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
      }, skipLocationChange: true
    };
    this.router.navigate(['/viewitem'], navigationExtras);

  }
  gotoDelete() {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
      }, skipLocationChange: true
    };
    this.router.navigate(['/deleteitem'], navigationExtras);
  }
  gotoHome() {
    this.router.navigate(['/home']);
  }
  gotoMyaccount() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/account'], navigationExtras);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
  gotoAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
  }
  gotoRegister() {
    this.router.navigate(['/register']);
  }
  gotoCart() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/cart'], navigationExtras);
  }
  gotoOrders() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/orders'], navigationExtras);
  }
  gotoAccount() {
    this.router.navigate(['/account']);
  }

  ngOnInit() {
  }

}
