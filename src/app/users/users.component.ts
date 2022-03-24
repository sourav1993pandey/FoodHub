
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
userList: any;
  constructor(private _httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {


    this.getUsers();

   }

   getUsers(){
    this._httpClient.get('http://localhost:4200/api/get/users').subscribe((result: any) =>{

      this.userList= result.data;
      console.log(this.userList);
    }, (error)=>{console.log(error);})
   }

   deleteUser(userId: string){
    this._httpClient.get('http://localhost:4200/api/delete/user/' + userId).subscribe((result: any) =>{
    }, (error)=>{console.log(error);})

    this.getUsers();

   }
  }


