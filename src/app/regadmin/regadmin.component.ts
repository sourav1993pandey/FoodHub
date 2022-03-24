import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regadmin',
  templateUrl: './regadmin.component.html',
  styleUrls: ['./regadmin.component.css']
})
export class RegadminComponent implements OnInit {

  loginForm: any;
  sbFormBuilder;
  showPassword = false;
  disableSubmitBtn = true;

  constructor(private formbuilder: FormBuilder, private httpclient: HttpClient, private router: Router) {
    this.sbFormBuilder= formbuilder;
   }

  ngOnInit(): void {
    this.initializeFormFields();
  }

  initializeFormFields() {
    this.loginForm = this.sbFormBuilder.group({
      name: new FormControl(null, [Validators.required]),
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

addAdmins(){
  console.log();
  const formValues = this.loginForm.value;

  let req = {
    "request": {
        "name": formValues.name,
        "email": formValues.email,
        "password": formValues.password
    }
};


this.httpclient.post<any>('http://localhost:4200/api/register/admins', req).subscribe({
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
