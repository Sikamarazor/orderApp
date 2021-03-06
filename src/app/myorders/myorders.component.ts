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
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
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

  company: any;
  address: any;
  address2: any;
  city: any;
  province: any;
  country: any;
  code: any;

  physicalAddress: any;
  addressUid: any;
  phyAddress: any;
  snapshots: any;
  cardholder: any;
  cardno: any;
  cvv: any;
  expyear: any;
  expmonth: any;
  transactions: any;
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
      this.operationsService.getAddress(this.uid).subscribe(data => {
        console.log(data);
        console.log(data[0].payload.doc.data());
        const tempData = data[0].payload.doc.data();
        this.phyAddress = data;
        if (data.length === 0) {

        } else {
          this.addressUid = data[0].payload.doc.id;
          this.company = tempData.company;
          this.address = tempData.address;
          this.address2 = tempData.address2;
          this.city = tempData.city;
          this.province = tempData.province;
          this.country = tempData.country;
          this.code = tempData.code;
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
      this.operationsService.getSnapshots(this.uid).subscribe(data => {
        console.log(data);
        this.snapshots = data;
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
  gotoCart() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/cart'], navigationExtras);
  }
  gotoMyaccount() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/account'], navigationExtras);
  }
  gotoAccount() {
    this.router.navigate(['/account']);
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

  gotoUpdateAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  gotoAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
  }
  gotoOrders() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/orders'], navigationExtras);
  }

  ngOnInit() {
    this.operationsService.getTransactions(this.uid).subscribe(data => {
      this.transactions = data;
      console.log(this.transactions);
      if (this.transactions.length === 0) {
        alert('No transactions');
      }
    });
  }

}
