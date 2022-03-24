import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
productList: any;
  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {

  //   let a = fetch('http://localhost:4200/api/get/items')
  //   .then(response => response.json())
  // .then(response => this.productList = response.data);;
    // console.log('========', a)


   this._httpClient.get('http://localhost:4200/api/get/items').subscribe((result: any) =>{

     this.productList= result.data;
     console.log(this.productList);
   }, (error)=>{console.log(error);})

  }
}
