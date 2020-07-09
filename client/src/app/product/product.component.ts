import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	
  openAddProductForm : FormGroup;
  editRecord: FormGroup;
  productList: Array<Product> = [];
  mode: any = false;

  constructor(
  	private formBuilder: FormBuilder,
  	private http: HttpClient,
  	private router: Router
  )
  { }

  ngOnInit(): void {
  	this.setForm();
  	this.getAllProducts();
  }

  editProduct(event: any, data: any) {
  	this.mode = true;
  	console.log(data);
  	this.editRecord = this.formBuilder.group({
  		eid: [data.id],
  		ename: [data.name],
  		eamount: [data.amount],
  		edescription: [data.description],
  	});
  	console.log(this.editRecord);
  }

  delProduct(event: any, data: any) {
  	console.log(data);
  	this.http.delete("http://localhost:3000/delProduct/"+data.id, data).subscribe(()=>{
  		console.log("deleted");
  		this.getAllProducts();
  	});
  }

  setForm() {
  	this.openAddProductForm = this.formBuilder.group({
  		name: [''],
  		amount: [''],
  		description: [''],
  		added_by: ['admin']
  	});
  	this.editRecord = this.formBuilder.group({
  		eid: [''],
  		ename: [''],
  		eamountt: [''],
  		edescription: [''],
  	});
  }

  getAllProducts() {
  	this.http.get("http://localhost:3000/getProducts").subscribe((products: Array<Product>)=>{
  		this.productList = products;
  	});
  }

  onRegisterSubmit() {
  	let data: any = this.openAddProductForm.value;
  	console.log(this.openAddProductForm.value);
  	this.http.post("http://localhost:3000/addProduct", data).subscribe((data: any)=>{
  		console.log(this.openAddProductForm.value);
  	});
 	 console.log("Registered");
  	this.getAllProducts();
  	this.setForm();
  }

  onEditSubmit() {
  	let data: any = this.editRecord.value;
  	console.log(this.editRecord.value);
  	console.log(data.id);
  	this.http.put("http://localhost:3000/editProduct/"+data.eid, data).subscribe((data:any)=>{
  		console.log("Edited");
  		this.mode=false;
  		this.getAllProducts();
  	});
  	
  }

}
