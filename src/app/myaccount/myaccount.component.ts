import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OperationsService } from '../service/operations.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  loggedIn: boolean;
  uid: any;
  foodData: any;
  quantity: any;
  userType: any;
  cellno: any;
  name: any;
  email: any;
  type: any;

  constructor(private router: Router, private operationsService: OperationsService, private route: ActivatedRoute) {
    this.loggedIn = false;
    this.quantity = 0;
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      if (!this.uid) {
        this.uid = localStorage.getItem('orderUid');
      }
      console.log(this.uid);
      this.operationsService.getProfile(this.uid).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.loggedIn = true;
          this.userType = data.type;
          this.cellno = data.cellno;
          this.name = data.name;
          this.email = data.email;
          this.type = data.type;
        } else {
          this.loggedIn = false;
        }
      });

      const unsubItems = this.operationsService.getStoredItems(this.uid).subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.quantity = this.quantity + data[i].quantity;
          console.log(this.quantity);
        }
        unsubItems.unsubscribe();
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

  updateProfile() {

      this.operationsService.updateProfile(this.uid, this.cellno, this.name).then(data => {
        alert('Successfully updated');
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
  continueToBilling() {

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

  ngOnInit() {
  }

}
