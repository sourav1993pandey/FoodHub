import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInform: any;
  disableSubmitBtn= true

  constructor(private _httpClient:HttpClient,private router:Router) {

    this.signInform= new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    //this.enableLoginSubmitButton();

   }

  ngOnInit(): void {

  }

  isValid(controlName:any){
  return this.signInform.get(controlName).invalid && this.signInform.get(controlName).touched;
  }

  // enableLoginSubmitButton() {
  //   this.signInform.valueChanges.subscribe((val: any) => {
  //     if (this.signInform.status === 'VALID') {
  //       this.disableSubmitBtn = false;
  //     } else {
  //       this.disableSubmitBtn = true;
  //     }
  //   });
  // }


  verifyUsers(){
    console.log(this.signInform);
    const formValues = this.signInform.value;






    let req = {
      "request": {

          "email": formValues.email,
          "password": formValues.password
      }
  };

  this._httpClient.post<any>('http://localhost:4200/api/verify/users', req).subscribe({
    next: response => {


      localStorage.setItem('token', response?.data?.token);
      this.router.navigate(['/userproducts'])
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})

}
}

