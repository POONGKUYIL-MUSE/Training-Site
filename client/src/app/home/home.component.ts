import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Array<Product> = [];
  currentRole: any;
  currentEmail: any;

  constructor(
  	private http: HttpClient,
  	private router: Router)
  { }

  ngOnInit(): void {
  	this.currentRole = localStorage.getItem('currentRole');
  	this.currentEmail = localStorage.getItem('currentEmail');
  	this.getAllProducts();
  }

  getAllProducts() {
  	this.http.get("http://localhost:3000/getProducts").subscribe((products: Array<Product>)=>{
  		this.productList = products;
  	});
  }

  AddToCart(event:any, data:any) {
  	console.log(data);
  	this.http.put("http://localhost:3000/addCart/"+this.currentEmail, data).subscribe((data:any)=>{
  		console.log("Added To Cart");
  	});
  }

}
