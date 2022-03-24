import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: any;
  sbFormBuilder;

  disableSubmitBtn = true;

  constructor(private formBuilder: FormBuilder) {
    this.sbFormBuilder=formBuilder;
   }

  ngOnInit(): void {
    this.initalizeFormfields();
  }

  initalizeFormfields(){
    this.checkoutForm= this.sbFormBuilder.group({

      firstName: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      lastName:  new FormControl(null, [Validators.required,Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      address2: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      cardName: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
    this.enableCheckoutSubmitButton();
  }
  enableCheckoutSubmitButton(){
    this.checkoutForm.valueChanges.subscribe((val: any) => {
      if (this.checkoutForm.status === 'VALID') {
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }
    });
  }

  isValid(controlName:any){
    return this.checkoutForm.get(controlName).invalid && this.checkoutForm.get(controlName).touched;
    }

}
