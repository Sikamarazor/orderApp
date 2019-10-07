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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
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

    saveAddress() {
      this.physicalAddress = {
        company: this.company,
        address: this.address,
        address2: this.address2,
        city: this.city,
        province: this.province,
        country: this.country,
        code: this.code
      };
      console.log(this.physicalAddress);
      this.operationsService.addAddress(this.uid, this.physicalAddress);
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
  continueToSummary() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/summary'], navigationExtras);
  }
  procedToPay() {

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

  gotoUpdateAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
  }

  ngOnInit() {
  }

}
