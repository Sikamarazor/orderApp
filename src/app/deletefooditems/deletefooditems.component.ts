import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OperationsService } from '../service/operations.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deletefooditems',
  templateUrl: './deletefooditems.component.html',
  styleUrls: ['./deletefooditems.component.css']
})
export class DeletefooditemsComponent implements OnInit {
  loggedIn: boolean;
  uid: any;
  foodData: any;
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

  constructor(private router: Router, private operationsService: OperationsService, private route: ActivatedRoute) {
    this.storeCart = [];
    this.loggedIn = false;
    this.count = 0;
    this.sumPrice = 0;
    this.quantity = 0;
    this.oldPrice = 0;
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
  deleteItem(x) {
    this.operationsService.deleteFoodItems(x);
    alert('Deleted');
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

  ngOnInit() {
    this.operationsService.getFooditems().subscribe(data => {
      console.log(data);
      this.foodData = data;
    });
  }

}
