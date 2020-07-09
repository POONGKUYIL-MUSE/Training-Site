import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  openAddCustomerForm : FormGroup;
  editRecord: FormGroup;
  customerList: Array<User> = [];
  mode: any = false;
  currentRole : any;

  constructor(
  	private formBuilder: FormBuilder,
  	private http: HttpClient,
  	private router: Router
  )
  { }

  ngOnInit(): void {
    this.currentRole = localStorage.getItem('currentRole');
  	this.setForm();
  	this.getAllCustomers();
  }

  editCustomer(event: any, data: any) {
  	this.mode = true;
  	console.log(data);
  	this.editRecord = this.formBuilder.group({
  		eid: [data.id],
  		ename: [data.name],
  		eemail: [data.email],
  		emobile: [data.mobile],
  		user_role: [data.user_role]
  	});
  	console.log(this.editRecord);
  }

  delCustomer(event: any, data: any) {
  	console.log(data);
  	this.http.delete("http://localhost:3000/delUser/"+data.id, data).subscribe(()=>{
  		console.log("deleted");
  		this.getAllCustomers();
  	});
  }

  setForm() {
  	this.openAddCustomerForm = this.formBuilder.group({
  		name: [''],
  		email: [''],
  		mobile: [''],
  		password: [''],
  		cfpassword: [''],
  		addedBy: [this.currentRole]
  	});
  	this.editRecord = this.formBuilder.group({
  		eid: [''],
  		ename: [''],
  		eemail: [''],
  		emobile: [''],
  		user_role: ['']
  	});
  }

  getAllCustomers() {
  	this.http.get("http://localhost:3000/getCustomers").subscribe((customers: Array<User>)=>{
  		this.customerList = customers;
  	});
  }

  onRegisterSubmit() {
  	let data: any = this.openAddCustomerForm.value;
  	console.log(this.openAddCustomerForm.value);
  	this.http.post("http://localhost:3000/addCustomer/", data).subscribe((data: any)=>{
  		console.log(this.openAddCustomerForm.value);
  	});
  	console.log("Registered");
  	this.getAllCustomers();
  	this.setForm();
  }

  onEditSubmit() {
  	let data: any = this.editRecord.value;
  	console.log(this.editRecord.value);
  	console.log(data.id);
  	this.http.put("http://localhost:3000/editUser/"+data.eid, data).subscribe((data:any)=>{
  		console.log("Edited");
  		this.mode=false;
  		this.getAllCustomers();
  	});
  	
  }

}
