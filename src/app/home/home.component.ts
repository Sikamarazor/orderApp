import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OperationsService } from '../service/operations.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  uid: any;
  foodData: any;
  quantity: any;
  userType: any;

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
  viewItem(fooditem) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.uid,
        fooditem: JSON.stringify(fooditem)
      }, skipLocationChange: true
    };
    this.router.navigate(['/viewitem'], navigationExtras);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
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

    this.operationsService.getFooditems().subscribe(data => {
      console.log(data);
      this.foodData = data;
    });

  }

}
