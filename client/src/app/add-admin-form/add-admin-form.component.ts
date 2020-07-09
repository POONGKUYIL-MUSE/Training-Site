import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.css']
})
export class AddAdminFormComponent implements OnInit {
  
  openAddAdminForm : FormGroup;
  editRecord: FormGroup;
  adminList: Array<User> = [];
  mode: any = false;
	
  constructor(
  	private formBuilder: FormBuilder,
  	private http: HttpClient,
  	private router: Router
  )
  { }

  ngOnInit(): void {
  	this.setForm()
  	this.getAllAdmins();
  }

  editAdmin(event: any, data: any){
  	this.mode = true;
  	console.log(data);
  	this.editRecord = this.formBuilder.group ({
  		eid: [data.id],
  		ename: [data.name],
  		eemail: [data.email],
  		emobile: [data.mobile],
  		user_role: [data.user_role]
  	});
  	console.log(this.editRecord);
  }

  delAdmin(event: any, data: any) {
  	console.log(data);
  	this.http.delete("http://localhost:3000/delUser/"+data.id, data).subscribe(()=>{
  		console.log("deleted");
  		this.getAllAdmins();
  	});
  }

  setForm() {
  	this.openAddAdminForm = this.formBuilder.group({
  		name: [''],
  		email: [''],
  		mobile: [''],
  		password: [''],
  		cfpassword: [''],
  		addedBy: ['superadmin']
  	});
  	this.editRecord = this.formBuilder.group({
  		eid: [''],
  		ename: [''],
  		eemail: [''],
  		emobile: [''],
  		user_role: ['']
  	});
  }

  getAllAdmins() {
  	this.http.get("http://localhost:3000/getAdmins").subscribe((admins: Array<User>)=>{
  		this.adminList = admins;
  	});
  }

  onRegisterSubmit() {
  	let data: any = this.openAddAdminForm.value;
  	console.log(this.openAddAdminForm.value);
  	this.http.post("http://localhost:3000/addAdmin/", data).subscribe((data: any)=>{
  		console.log(this.openAddAdminForm.value);
  	});
  	console.log("Registered");
  	this.getAllAdmins();
  	this.setForm();
  }


  onEditSubmit() {
  	let data: any = this.editRecord.value;
  	console.log(this.editRecord.value);
  	console.log(data.id);
  	this.http.put("http://localhost:3000/editUser/"+data.eid, data).subscribe((data:any)=>{
  		console.log("Edited");
  		this.mode=false;
  		this.getAllAdmins();
  	});
  	
  }

}
