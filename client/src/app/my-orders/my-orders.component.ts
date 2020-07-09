import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Product } from '../product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  currentUser: any;
  currentEmail: any;
  currentRole: any;
  orderdata: any;
  totorderdata: any;
  superadminTable: boolean = false;
  adminTable: boolean = false;
  customerTable: boolean = false;

  constructor(
  	private http: HttpClient,
  	private router: Router){}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentEmail = localStorage.getItem('currentEmail');
    this.currentRole = localStorage.getItem('currentRole');
    if(this.currentRole == "superadmin") {
    	this.superadminTable = true;
    	this.getAllOrder();

    } else if(this.currentRole == "admin") {
    	this.adminTable = true;
    	this.getAllOrder();

    }
    else {
    	this.customerTable = true;
    	this.getPlacedOrders();
    }
  	
  }
 	
  getAllOrder() {
  	this.http.get("http://localhost:3000/getPlacedOrders").subscribe((data:any)=>{
  		this.totorderdata = data;

  	});
  }

  getPlacedOrders() {
  	this.http.get("http://localhost:3000/getOrders/"+ this.currentEmail).subscribe((data:any)=>{
  		this.orderdata = data;
  		console.log(this.orderdata[0].product_name);
  		console.log(data);
  		console.log(this.orderdata);
  	});

  }

}
