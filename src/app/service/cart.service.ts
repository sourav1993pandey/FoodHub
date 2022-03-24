import { Injectable } from '@angular/core';
import { template } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any=[];
  public productlist = new BehaviorSubject<any>([]);
  public search= new BehaviorSubject<string>("");

  constructor() { }
getProducts(){
  return this.productlist.asObservable();

}
setProducts(product : any){
this.cartItemList.push(...product);
this.productlist.next(product);
}

addToCart(product: any){
  this.cartItemList.push(product);
  this.productlist.next(this.cartItemList);
  this.getTotalPrice();
  console.log(this.cartItemList)

}
getTotalPrice() : number{
  let grandTotal= 0;
  this.cartItemList.map((a:any)=>{
    grandTotal +=  a.total;
    console.log('====',grandTotal)
  })
  return grandTotal;

}
reamoveCartItem(product : any){
this.cartItemList.map((a:any, index:any)=>{
  if(product.id=== a.id){
    this.cartItemList.splice(index,1);
  }
})
this.productlist.next(this.cartItemList);
}

removeAllCart(){
  this.cartItemList=[];
  this.productlist.next(this.cartItemList);
}

}
