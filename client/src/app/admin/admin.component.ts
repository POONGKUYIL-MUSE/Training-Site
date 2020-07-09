import { Component, OnInit } from '@angular/core';

//Import Necessary Packages
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  	if(localStorage.getItem('currentId')==null){
  		alert("Please Register or Try Login....");
  		this.router.navigateByUrl('/');
  	}
  	this.router.navigateByUrl('/admin/orders');
  }

  logout(){
  	localStorage.removeItem('currentUser')
  	localStorage.removeItem('currentEmail');
  	localStorage.removeItem('currentId');
  	localStorage.removeItem('currentRole');
  	this.router.navigateByUrl('/');
  }

}
