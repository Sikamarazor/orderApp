import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ViewitemComponent } from './viewitem/viewitem.component';
import { DeletefooditemsComponent } from './deletefooditems/deletefooditems.component';
import { AdditemsComponent } from './additems/additems.component';
import { AddressComponent } from './address/address.component';
import { AddAddressesComponent } from './add-addresses/add-addresses.component';
import { PaymentComponent } from './payment/payment.component';
import { SummaryComponent } from './summary/summary.component';
import { PaymentsuccesComponent } from './paymentsucces/paymentsucces.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'account', component: MyaccountComponent },
    { path: 'viewitem', component: ViewitemComponent },
    { path: 'deleteitem', component: DeletefooditemsComponent },
    { path: 'additem', component: AdditemsComponent },
    { path: 'address', component: AddressComponent },
    { path: 'addAddress', component: AddAddressesComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'paymentsuccess', component: PaymentsuccesComponent },
    { path: 'orders', component: MyordersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' },
    { path: 'login', redirectTo: 'login' },
    { path: 'register', redirectTo: 'register' },
    { path: 'cart', redirectTo: 'cart' },
    { path: 'account', redirectTo: 'account' },
    { path: 'viewitem', redirectTo: 'viewitem' },
    { path: 'deleteitem', redirectTo: 'deleteitem' },
    { path: 'address', redirectTo: 'address' },
    { path: 'addAddress', redirectTo: 'addAddress' },
    { path: 'payment', redirectTo: 'payment' },
    { path: 'summary', redirectTo: 'summary' },
    { path: 'paymentsuccess', redirectTo: 'paymentsuccess' },
    { path: 'orders', redirectTo: 'orders' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


