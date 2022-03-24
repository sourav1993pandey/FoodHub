import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  signInform: any;
  disableSubmitBtn= true


  constructor(private _httpClient:HttpClient, private router:Router) {

    this.signInform= new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  isValid(controlName:any){
  return this.signInform.get(controlName).invalid && this.signInform.get(controlName).touched;
  }

  verifyAdmin(){
    console.log(this.signInform);
    const formValues = this.signInform.value;



    let req = {
      "request": {

          "email": formValues.email,
          "password": formValues.password
      }
  };

  this._httpClient.post<any>('http://localhost:4200/api/verify/admins', req).subscribe({
    next: response => {


      localStorage.setItem('token', response?.data?.token);
      this.router.navigate(['/wayTo'])
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})

}

}
