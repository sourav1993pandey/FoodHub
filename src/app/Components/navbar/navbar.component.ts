import { CartService } from './../../service/cart.service';
import { UserproductsComponent } from './../userproducts/userproducts.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public searchTerm !: string;

public  totalItem: number=0;
  constructor(private userproducts:UserproductsComponent, private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem= res.length;
    })
  }
search(event:any){
this.searchTerm=(event.target as HTMLInputElement).value;
console.log(this.searchTerm);
this.cartService.search.next(this.searchTerm);
}
}
