import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  adminList: any;
  constructor(private _httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {


    this.getAdmins();

   }

   getAdmins(){
    this._httpClient.get('http://localhost:4200/api/get/admins').subscribe((result: any) =>{

      this.adminList= result.data;
      console.log(this.adminList);
    }, (error)=>{console.log(error);})
   }

   deleteAdmin(adminId: string){
    this._httpClient.get('http://localhost:4200/api/delete/admin/' + adminId).subscribe((result: any) =>{
    }, (error)=>{console.log(error);})

    this.getAdmins();

   }
  }


