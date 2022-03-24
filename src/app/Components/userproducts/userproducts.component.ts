import { CartService } from './../../service/cart.service';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent implements OnInit {
public productList: any;
searchKey:string="";
// public search= new BehaviorSubject<string>("");

  constructor(private httpClient:HttpClient, private cartService: CartService) { }

  ngOnInit(): void {

    this.httpClient.get('http://localhost:4200/api/get/items').subscribe((result: any) =>{

     this.productList= result.data;
     this.productList.forEach((a :any) => {
      Object.assign(a,{quantity:1,total:a.price});

    });

    console.log(this.productList);

   }, (error)=>{console.log(error);





  });



   this.cartService.search.subscribe((val:any)=>{
     this.searchKey=val;
     console.log("this.searchKey", this.searchKey)
     console.log('this', JSON.stringify(this.productList));
    //  this.productList =
    //  this.productList.filter(function (ele: any, i: any, array: any){
    //   console.log('==========')
    //   console.log(ele)
    //   console.log(i)
    //   console.log(array)
    //   //  let arrElement = ele.name.toLowerCase
    //  });
   })
  }

  addtocart(product: any){
this.cartService.addToCart(product);
  }

}
