
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Users } from 'src/app/product-detail/models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  sbFormBuilder;
  showPassword = false;
  disableSubmitBtn = true;
  //user: Users=new Users();

  constructor(private formBuilder: FormBuilder, private _httpClient:HttpClient,private router:Router) {
    this.sbFormBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.initializeFormFields();
  }



  initializeFormFields() {
    this.loginForm = this.sbFormBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    }, {
      validator: (formControl: any) => {
        const passCtrl = formControl.controls.password;
        const conPassCtrl = formControl.controls.confirmPassword;
        if (passCtrl.value !== conPassCtrl.value) {
          conPassCtrl.setErrors({ validatePasswordConfirmation: true });
        } else { conPassCtrl.setErrors(null); }
        return null;
      }
    });
     this.enableLoginSubmitButton();
  }

  enableLoginSubmitButton() {
    this.loginForm.valueChanges.subscribe((val: any) => {
      if (this.loginForm.status === 'VALID') {
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }
    });
  }


  onSubmitloginForm() {
    console.log('=======', this.loginForm.value)
  }

  addUsers(){
    console.log();
    const formValues = this.loginForm.value;

    let req = {
      "request": {
          "name": formValues.name,
          "email": formValues.email,
          "password": formValues.password
      }
  };


  this._httpClient.post<any>('http://localhost:4200/api/register/users', req).subscribe({
    next: data => {

      console.log(data);
    },
    error: error => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})


}
}
