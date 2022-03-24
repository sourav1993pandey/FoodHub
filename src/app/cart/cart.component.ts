import { HttpClient } from '@angular/common/http';
import { CartService } from './../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any =[];
  public grandTotal !: number;

  constructor(private cartService : CartService, private _httpClient:HttpClient) { }

  ngOnInit(): void {

    // this._httpClient.get('http://localhost:4200/api/get/items').subscribe((result: any) =>{

    //   this.products= result.data;
    //   console.log(this.products);
    // }, (error)=>{console.log(error);})




    this.cartService.getProducts().subscribe(res=>{
      this.products=res;
      this.grandTotal= this.cartService.getTotalPrice();
      console.log(res)
      console.log(this.grandTotal)
    })
  }
  removeItem(item : any){
 this.cartService.reamoveCartItem(item);
  }

  emptyCart(){
    this.cartService.removeAllCart();

  }

}
