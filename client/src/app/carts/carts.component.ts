import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { Cart } from '../cart';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  ids = Array<number>();
  currentUser: any;
  currentEmail: any;
  cartList: Array<Cart> = [];
  finalList: FormGroup;
  listArray: any;
  openForm: boolean = false;
  billamount: number = 0;
  order_product_names: string;
  order_product_quantities: string;
  order_product_amounts: string;
  order_totalamount: number;

  order_details : any = {};

  constructor(
    private formBuilder: FormBuilder,
  	private http: HttpClient,
  	private router: Router)
  { }

  ngOnInit(): void {
  	this.currentUser = localStorage.getItem('currentUser');
  	this.currentEmail = localStorage.getItem('currentEmail');
  	this.getMyCart();
  	this.finalList = this.formBuilder.group({
  		lists: this.formBuilder.array([])
  	});
  }

  getMyCart() {
  	this.http.get("http://localhost:3000/getmycart/"+this.currentEmail).subscribe((data:any)=>{
  		this.cartList = data;
  	});
  }

  onChange(data: any, isChecked: boolean){
  	console.log("Cart");
  	console.log(data);
  	const listArray = <FormArray>this.finalList.controls.lists;

  	if(isChecked){
  		listArray.push(new FormControl(data));
  		console.log("pushed");

  	}
  	else {
  		let index = listArray.controls.findIndex(x=>x.value == data);
  		listArray.removeAt(index);
  		console.log("not pushed");
  	}
  }

  placeOrder() {
  	console.log(this.finalList);
  	if(this.finalList.value.lists == 0){
  		alert("Select one / more product to place order...");
  	}
  	else {
  		console.log(this.finalList.value.lists);
  		console.log(this.finalList.value.lists.length);
  		this.openForm = true;
  		/*var i = 0;
  		for (let i = 0; i<this.finalList.value.lists.length; i++) {
  			this.billamount += this.finalList.value.lists[i].product_totalamount;
  		}*/

  		console.log(this.finalList.value.lists);
  		console.log(this.cartList);

  		this.generateBillAmount();
  	}
  }

  addTotal(event:any, index:number) {
  	var quans = event.target.value;
  	this.finalList.value.lists[index].product_quantity = quans;
  	console.log('quans : >>>> '+ this.finalList.value.lists[index].product_quantities);
  	this.finalList.value.lists[index].product_totalamount = quans*this.finalList.value.lists[index].product_amount;
  	console.log(this.finalList.value.lists);
  	this.generateBillAmount();
  }

  generateBillAmount() {
  	var i = 0;
  	this.billamount = 0;
  	for (let i=0; i<this.finalList.value.lists.length; i++) {
  		this.billamount += this.finalList.value.lists[i].product_totalamount;
  	}
  }

  onSubmitOrder() {
  	console.log("order submitted");
  	this.concatenate();
  	this.order_details = {
  		username: this.currentUser,
  		useremail: this.currentEmail,
  		product_names: this.order_product_names,
  		product_quantities: this.order_product_quantities,
  		product_amounts: this.order_product_amounts,
  		order_totalamount: this.order_totalamount
  	};
  	this.http.post("http://localhost:3000/addOrder", this.order_details).subscribe((data:any)=>{
  		//this.updateCart();
  		console.log("Added to Order Table");
  		this.router.navigateByUrl('/customer/myorders');
  	});

  	console.log(this.order_details);
  }

  /*updateCart(){
  	
  	var i = 0;
  	for(i=0; i<this.finalList.value.lists.length; i++) {
  		this.ids.push(this.finalList.value.lists[i].product_id);
  	}
  	console.log("Product ids : ");
  	console.log(this.ids);
  	console.log(this.finalList.value.lists);
  	this.http.delete("http://localhost:3000/updcart/"+this.currentEmail, this.ids).subscribe((data: any)=>{
  		console.log("Cart updated");
  	});
  }*/

  concatenate() {
  	var i = 0;
  	this.order_product_names = '';
  	this.order_product_quantities = '';
  	this.order_product_amounts = '';
  	this.order_totalamount = 0;
  	for(let i=0; i<this.finalList.value.lists.length; i++) {

  		this.order_product_names += this.finalList.value.lists[i].product_name + ",";

  		this.order_product_quantities += this.finalList.value.lists[i].product_quantity.toString() + ",";

  		this.order_product_amounts += this.finalList.value.lists[i].product_amount.toString() + ",";

  		this.order_totalamount += this.finalList.value.lists[i].product_amount;
  	}
  	console.log(this.order_product_names);
  	console.log(this.order_product_quantities);
  	console.log(this.order_product_amounts);
  	console.log(this.order_totalamount);
  }

}
