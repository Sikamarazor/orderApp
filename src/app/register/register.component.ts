import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Person } from '../../models/person';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hideloading: any;
  public person = {} as Person;
  confirmPassword: string;
  uid: any;
  userType = [];
  typeOfUser: any;
  constructor(private router: Router, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.hideloading = false;
    this.userType = [{ 'userType': 'customer' }, { 'userType': 'admin' }];
    console.log(this.userType);
  }
  selectUser(e) {
    console.log(e);
    this.typeOfUser = e.srcElement.value;
  }
  register(person: Person) {

    if (person.name == null) {
      alert('Name empty');
    } else if (person.cellno == null) {
      // console.log(("Nex");
      alert('cell no empty');
    } else if (person.email == null) {

      alert('Please enter email');
    } else if (person.password == null) {

      alert('Password empty');
    } else if (person.password !== this.confirmPassword) {

      alert('Password dont match');
    } else {
      this.afAuth.auth
        .createUserWithEmailAndPassword(person.email.toLowerCase().trim(), person.password).then(newUser => {
          localStorage.setItem('orderUid', newUser.user.uid);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              uid: newUser.user.uid,
            }, skipLocationChange: true
          };
          this.router.navigate(['/home'], navigationExtras);
          firebase
            .database()
            .ref('/userProfile')
            .child(newUser.user.uid)
            .set({
              name: person.name,
              cellno: person.cellno,
              email: person.email,
              type: this.typeOfUser,
              walletBalance: 0,
            });
        }, (error) => {
          alert(error.message);
        });
    }
  }

  ngOnInit() {
  }

}
