import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
//import { Products } from '../product-detail/models/products';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  uploadProducts:any;
  disableSubmitBtn= true
  fileInputLabel: any;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  imagePath: string;



  constructor(private http: HttpClient, private _router:Router) {

    this.uploadProducts= new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      uploadedImage: new FormControl(null)
    });

   }

  ngOnInit(): void {}


  isValid(controlName:any){
    return this.uploadProducts.get(controlName).invalid && this.uploadProducts.get(controlName).touched;
    }

    onFileSelect(event: any) {
      const file = event.target.files[0];
      this.fileInputLabel = file.name;
      this.uploadProducts.get('uploadedImage')?.setValue(file);

      if (!this.uploadProducts.get('uploadedImage')?.value) {
        alert('Please fill valid details!');
        return false;
      }

      const formData = new FormData();

      formData.append('uploadedImage', this.uploadProducts.get('uploadedImage')?.value);
      formData.append('agentId', '007');


      this.http
        .post<any>('http://localhost:4200/api/uploadfile', formData).subscribe(response => {
          console.log(response);
          if (response.statusCode === 200) {
            this.imagePath = response?.uploadedFile.filename;
            // Reset the file input
            // this.uploadFileInput.nativeElement.value = "";
            // this.fileInputLabel = undefined;
          }
        }, er => {
          console.log(er);
          alert(er.error.error);
        });


    }



  addProducts(){
      console.log(this.uploadProducts);
      const formValues = this.uploadProducts.value;

      console.log('==========this.imagePath', this.imagePath)

      let req = {
        "request": {
            "name": formValues.name,
            "price": formValues.price,
            "image": this.imagePath
        }
    };




      this.http.post<any>('http://localhost:4200/api/insertitem', req).subscribe({
        next: data => {
          console.log(data);
          //this._router.navigate(['/products'])
        },
        error: error => {
          this._router.navigate(['/products'])
            // this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })




  }

}
