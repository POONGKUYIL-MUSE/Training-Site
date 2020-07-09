import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from "./auth.guard";

/*
* @@@@ Components @@@@
*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { AddAdminFormComponent } from './add-admin-form/add-admin-form.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartsComponent } from './carts/carts.component';


/*
* @@@@ Routes @@@@
*/
const routes : Routes = [
  { path: '', component: SignupFormComponent },
  
  { path: 'superadmin', component: SuperAdminComponent, 
  children: [
    { path: 'orders', component: MyOrdersComponent },
    { path: 'addAdmin', component: AddAdminFormComponent},
    { path: 'addCustomer', component: AddCustomerFormComponent }
  ]},
  
  { path: 'admin', component: AdminComponent, 
  children: [
    { path: 'orders', component: MyOrdersComponent },
    { path: 'addCustomer', component: AddCustomerFormComponent },
    { path: 'product', component: ProductComponent }
  ]},
  
  { path: 'customer', component: CustomerComponent, 
  children: [
    { path: 'myorders', component: MyOrdersComponent},
    { path: 'mycarts', component: CartsComponent },
    { path: 'home', component: HomeComponent}
  ]}
];


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    SuperAdminComponent,
    AdminComponent,
    CustomerComponent,
    AddAdminFormComponent,
    AddCustomerFormComponent,
    ProductComponent,
    HomeComponent,
    MyOrdersComponent,
    CartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
  }
}
