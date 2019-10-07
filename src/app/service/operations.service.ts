import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  signedInRef: AngularFireObject<any>;
  getTemplateRef: AngularFireObject<any>;
  getCartRef: AngularFireObject<any>;
  item: any;
  snapShot: any;
  constructor(private afd: AngularFireDatabase, private afs: AngularFirestore) { }
  getProfile(uid) {
    console.log(uid);
    return this.afd.object('/userProfile/' + uid).valueChanges();
  }
  updateProfile(uid, cellno, name) {
    return this.afd.object('/userProfile/' + uid).update({
      cellno: cellno,
      name: name
    });
  }
  getFooditems() {
    return this.afd.list('/fooditems').valueChanges();
  }
  searchFromCart(uid, url) {
    console.log(url);

    // tslint:disable-next-line:max-line-length
    return this.item = this.afs.collection('/storecart/').doc(uid).collection('/cart/', ref => ref.where('foodUrl', '==', url)).snapshotChanges();

  }

  searchAddress(uid, url) {
    console.log(url);

    // tslint:disable-next-line:max-line-length
    return this.item = this.afs.collection('/storecart/').doc(uid).collection('/cart/', ref => ref.where('foodUrl', '==', url)).snapshotChanges();

  }

  getAddress(uid) {
    return this.afs.collection('/userAddress/').doc(uid).collection('/addresses/').snapshotChanges();
  }
  updateAddress(uid, physicalAddress, addressUid) {
    return this.afs.collection('userAddress')
      .doc(uid)
      .collection('addresses')
      .doc(addressUid)
      .update({
        company: physicalAddress.company,
        address: physicalAddress.address,
        address2: physicalAddress.address2,
        city: physicalAddress.city,
        province: physicalAddress.province,
        country: physicalAddress.country,
        code: physicalAddress.code
      });
  }

  addAddress(uid, physicalAddress) {
    return this.afs.collection('userAddress')
    .doc(uid)
    .collection('addresses')
    .add({
      company: physicalAddress.company,
      address: physicalAddress.address,
      address2: physicalAddress.address2,
      city: physicalAddress.city,
      province: physicalAddress.province,
      country: physicalAddress.country,
      code: physicalAddress.code
    });
  }

  addToTrasanctions(uid, obj, currDate) {
    return this.afs.collection('trasanctionHistory')
      .doc(uid)
      .collection('trasanctions')
      .add({
        name: obj.name,
        desc: obj.desc,
        foodUrl: obj.foodUrl,
        quantity: obj.quantity,
        totPrice: obj.totPrice,
        date: currDate
      });
  }

  deleteAllCart(uid, foodId) {
    console.log(uid);
    return this.afs.collection('/storecart').doc(uid).collection('/cart/').doc(foodId).delete().then(dd => {
      console.log(dd);
    });
  }
  deleteFromCart(uid, cuid) {
    return this.afs.collection('/storecart/').doc(uid).collection('/cart/').doc(cuid).delete();
  }
  searchOldFromCart(uid, url) {
    console.log(url);

    // tslint:disable-next-line:max-line-length
    return this.item = this.afs.collection('/storecart/').doc(uid).collection('/cart/', ref => ref.where('foodUrl', '==', url)).valueChanges();

  }
  getTransactions(uid) {
    return this.afs.collection('trasanctionHistory').doc(uid).collection('trasanctions').valueChanges();
  }
  getSnapshots(uid) {
    return this.afs.collection('/storecart/').doc(uid).collection('/cart').snapshotChanges();
  }
  getStoredItems(uid) {
    return this.afs.collection('/storecart/').doc(uid).collection('/cart').valueChanges();
  }
  deleteFoodItems(url) {
    this.getTemplateRef = this.afd.object('/fooditems');

    this.getTemplateRef.query.orderByChild('foodUrl').equalTo(url).once('child_added', (snapshot) => {
      console.log(snapshot.key);
      this.removeFooditem(snapshot.key);

    });
  }
  removeFooditem(key) {
    this.afd.object('/fooditems/' + key).remove().then(data => {
      console.log(data);
    });
  }
  uploadFoodImage(snapshotKey, file) {
    console.log(file);
    // this.templateColuRef = this.afs.collection('/templates');

    const storageRef = firebase.storage().ref('/fooditems');
    console.log(storageRef);
    console.log(file);
    const uploadLogo = storageRef.child(snapshotKey).child('foodlogo').child(file.name);
    console.log(uploadLogo);

    const uploadTaskLg = uploadLogo.put(file).then(data => {
      console.log(data);

      const storages = firebase.storage();
      const gsReference = storages.refFromURL('gs://orderapp-e7db6.appspot.com/fooditems/' + snapshotKey + '/foodlogo/' + file.name);
      console.log(gsReference);
      gsReference.getDownloadURL().then((url) => {
        console.log(url);
        const storRef = this.afd.database.ref('/fooditems/' + snapshotKey);
        storRef.update({
          foodUrl: url
        });
      });
    });
    return this.snapShot;
  }
}
