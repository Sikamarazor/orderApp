import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OperationsService } from '../service/operations.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
declare var require: any;
const fileUpload = require('fuctbase64');
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
export class AdditemsComponent implements OnInit {

  loggedIn: boolean;
  uid: any;
  desc: any;
  name: any;
  price: any;
  file: any;
  fileResult: any;
  userType: any;

  constructor(private router: Router, private operationsService: OperationsService, private route: ActivatedRoute
    , private afd: AngularFireDatabase) {
    this.loggedIn = false;
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
        desc: this.desc,
        price: this.price
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
  gotoAddress() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/addAddress'], navigationExtras);
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

  gotoLogin() {
    this.router.navigate(['/login']);
  }
  gotoRegister() {
    this.router.navigate(['/register']);
  }
  gotoCart() {
    this.router.navigate(['/cart']);
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
  gotoOrders() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid
      }, skipLocationChange: true
    };
    this.router.navigate(['/orders'], navigationExtras);
  }
  ngOnInit() {
  }

}
