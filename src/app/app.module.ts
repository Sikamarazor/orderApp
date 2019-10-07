import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ViewitemComponent } from './viewitem/viewitem.component';
import { AdditemsComponent } from './additems/additems.component';
import { DeletefooditemsComponent } from './deletefooditems/deletefooditems.component';
import { AddressComponent } from './address/address.component';
import { AddAddressesComponent } from './add-addresses/add-addresses.component';
import { PaymentComponent } from './payment/payment.component';
import { SummaryComponent } from './summary/summary.component';
import { PaymentsuccesComponent } from './paymentsucces/paymentsucces.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ConvertdatePipe } from './convertdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    MyaccountComponent,
    ViewitemComponent,
    AdditemsComponent,
    DeletefooditemsComponent,
    AddressComponent,
    AddAddressesComponent,
    PaymentComponent,
    SummaryComponent,
    PaymentsuccesComponent,
    MyordersComponent,
    ConvertdatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
