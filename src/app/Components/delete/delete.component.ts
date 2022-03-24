import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/product-detail/models/products';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

id: any;
product: Products=new Products();

  constructor(private _activateRoute:ActivatedRoute, private _httpClient:HttpClient) { }

  ngOnInit(): void {

    this.id=this._activateRoute.snapshot.paramMap.get("id");
    this._httpClient.get('http://localhost:4200/api/delete/item/' + this.id).subscribe((result: any) =>{
      this.product=result.data
    }, (error)=>{console.log(error);})


  }

}
