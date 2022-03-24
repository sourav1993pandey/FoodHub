
import { WayToComponent } from './way-to/way-to.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { UserproductsComponent } from './Components/userproducts/userproducts.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './signin/signin.component';
import { DeleteComponent } from './Components/delete/delete.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsComponent } from './products/products.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { RegadminComponent } from './regadmin/regadmin.component';

export const applicationRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'delete/:id', component:DeleteComponent},
  {path: 'products-add', component: ProductsAddComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'users', component:UsersComponent},
  {path: 'delete-user/:id', component:DeleteUserComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'upload-file', component:UploadFileComponent},
  {path: 'userproducts', component:UserproductsComponent},
  {path: 'cart', component:CartComponent},
  {path: 'checkout', component: CheckoutComponent},
{path: 'admin-List', component:AdminListComponent},
{path: 'regadmin' , component:RegadminComponent },
  {path: 'wayTo', component:WayToComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(applicationRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
