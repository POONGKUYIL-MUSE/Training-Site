import { Component, OnInit } from '@angular/core';

//Import Necessary Packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  	
  	if(localStorage.getItem('currentId')==null){
  		alert("Please Register or Try Login....");
  		this.router.navigateByUrl('/');
  	} 
  	this.router.navigateByUrl('/superadmin/orders');
  }

  logout(){
  	localStorage.removeItem('currentUser')
  	localStorage.removeItem('currentEmail');
  	localStorage.removeItem('currentId');
  	localStorage.removeItem('currentRole');
  	this.router.navigateByUrl('/');
  }

}
