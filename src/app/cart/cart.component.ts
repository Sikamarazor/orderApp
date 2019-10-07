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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
  cartItems: any;
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
        this.cartItems = data;
        for (let i = 0; i < data.length; i++) {
          this.quantity = this.quantity + data[i].quantity;
          this.sumPrice = this.sumPrice + data[i].totPrice;
          console.log(this.sumPrice);
        }
       // unsubItems.unsubscribe();
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
  gotoAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
  }

  removeFromCart(x) {
    const unsub = this.operationsService.searchFromCart(this.uid, x).subscribe(data => {
      console.log(data);
      this.operationsService.deleteFromCart(this.uid, data[0].payload.doc.id);
      // unsub.unsubscribe();
      if (data.length === 0) {
      } else {

      }
    });
  }
  gotoOrders() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/orders'], navigationExtras);
  }
  goHome() {
      this.router.navigate(['/home']);
  }
  procedToPay() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
        quantity: this.quantity,
        sumPrice: this.sumPrice,
        cartItems: JSON.stringify(this.cartItems)
      }, skipLocationChange: true
    };
    this.router.navigate(['/address'], navigationExtras);
  }
  gotoCart() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/cart'], navigationExtras);
  }
  gotoAccount() {
    this.router.navigate(['/account']);
  }
  gotoMyaccount() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/account'], navigationExtras);
  }
  logout() {
    localStorage.clear();
    alert('Successfully logged out');
    this.router.navigate(['/login']);
    this.quantity = 0;
  }

  additem() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
      }, skipLocationChange: true
    };
    this.router.navigate(['/additem'], navigationExtras);

  }
  gotoDelete() {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
      }, skipLocationChange: true
    };
    this.router.navigate(['/deleteitem'], navigationExtras);
  }


  ngOnInit() {

  }

}
