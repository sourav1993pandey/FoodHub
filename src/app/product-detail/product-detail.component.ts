import { Component, OnInit } from '@angular/core';
import { Products } from './models/products';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
id: any;
product: Products=new Products();
  constructor(private _activateRoute: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {

    this.id=this._activateRoute.snapshot.paramMap.get("id");
    this._httpClient.get('http://localhost:4200/api/get/item/' + this.id).subscribe((result: any) =>{
      this.product=result.data
    }, (error)=>{console.log(error);})



    // this.id=this._activateRoute.snapshot.paramMap.get("id");
    // this._httpClient.get<Products>('http://localhost:3000/get/item/' + this.id).subscribe((result: any)=>{
    //   this.product=result.data
    //   console.log("==============", this.product)
    // }, (error) => {console.log(error);})
  }

}


