import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from '../../models/person';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hideloading: any;
  public person = {} as Person;
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.hideloading = false;
  }

  gotoHome(person: Person, content) {
    console.log(person);
    // person.email = 'Lefanyathi@gmail.com';
    // person.password = '123456';
    this.afAuth.auth
      .signInWithEmailAndPassword(person.email.toLowerCase().trim(), person.password).then(user => {
        console.log(user.user.uid);
        localStorage.setItem('orderUid', user.user.uid);
        const navigationExtras: NavigationExtras = {
          queryParams: {
            uid: user.user.uid,
          }, skipLocationChange: true
        };
        this.router.navigate(['/home'], navigationExtras);
        this.hideloading = true;

      }, (error) => {
        alert(error.message);
      });
  }
  gotoRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
