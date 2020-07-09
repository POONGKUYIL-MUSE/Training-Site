import { Component, OnInit } from '@angular/core';

//builtin packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

//User-defined Class
import { User } from '../user';
import { AuthLogin } from '../login';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  openLoginForm = false;
  openRegisterForm = true;
  loginForm : FormGroup;
  registerForm : FormGroup;

  userList: Array<User> = [];

  constructor(
  	private formBuilder: FormBuilder,
  	private http: HttpClient,
  	private router: Router) 
  { }
  
  ngOnInit(): void {
  	this.loginForm = this.formBuilder.group({
  		email: [''],
  		password: ['']
  	});
  	this.registerForm = this.formBuilder.group({
  		name: [''],
  		email: [''],
  		mobile: [''],
  		password: [''],
  		cfpassword: ['']
  	});
  }

  changeForm(event : any) {
  	this.openLoginForm = !this.openLoginForm;
  	this.openRegisterForm = !this.openRegisterForm
  }

  checkLogin() {

  }

  onLoginSubmit() {
  	let data: any = this.loginForm.value;
  	/*console.log(this.loginForm.value);
  	this.http.post("http://localhost:3000/login/", data).subscribe((data:any)=>{
  		console.log(data);
  		console.log(this.loginForm.value);
  	});*/

  	this.http.post("http://localhost:3000/login", data).subscribe((users: Array<User>)=>{
  		this.userList = users;
  		console.log(this.userList);
  		let m: any = this.userList;
  		let role: string = m[0].user_role;
  		console.log(m[0].user_role);

  		if(role=="superadmin") {
  			localStorage.setItem('currentUser', m[0].name);
  			localStorage.setItem('currentEmail', m[0].email);
  			localStorage.setItem('currentId', m[0].id);
  			localStorage.setItem('currentRole', m[0].user_role);

  			this.router.navigateByUrl('superadmin');
		}
		else if (role=="admin"){
			localStorage.setItem('currentUser', m[0].name);
  			localStorage.setItem('currentEmail', m[0].email);
  			localStorage.setItem('currentId', m[0].id);
  			localStorage.setItem('currentRole', m[0].user_role);

			this.router.navigateByUrl('admin');
		}
		else {
			localStorage.setItem('currentUser', m[0].name);
  			localStorage.setItem('currentEmail', m[0].email);
  			localStorage.setItem('currentId', m[0].id);
  			localStorage.setItem('currentRole', m[0].user_role);
  			
			this.router.navigateByUrl('customer');
		}
  		//this.router.navigateByUrl('superadmin');
  	});
  	console.log("Logged in");
  	
  }

  onRegisterSubmit() {
  	let data: any = this.registerForm.value;
  	console.log(this.registerForm.value);
  	this.http.post("http://localhost:3000/register/", data).subscribe((data:any)=>{
  		console.log(this.registerForm.value);
  	});
  	console.log("Registered");

  }

}
