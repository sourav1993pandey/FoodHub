import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: any;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage')?.setValue(file);

    if (!this.fileUploadForm.get('uploadedImage')?.value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();

    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage')?.value);
    formData.append('agentId', '007');


    this.http
      .post<any>('http://localhost:4200/api/uploadfile', formData).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });


  }


  onFormSubmit() {

    // if (!this.fileUploadForm.get('uploadedImage')?.value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    // const formData = new FormData();

    // formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage')?.value);
    // formData.append('agentId', '007');


    // this.http
    //   .post<any>('http://localhost:4200/api/uploadfile', formData).subscribe(response => {
    //     console.log(response);
    //     if (response.statusCode === 200) {
    //       // Reset the file input
    //       this.uploadFileInput.nativeElement.value = "";
    //       this.fileInputLabel = undefined;
    //     }
    //   }, er => {
    //     console.log(er);
    //     alert(er.error.error);
    //   });
  }

}
