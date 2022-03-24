
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from "@angular/common/http"

import { applicationRoutes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { IntroComponent } from './Components/intro/intro.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsComponent } from './products/products.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DeleteComponent } from './Components/delete/delete.component';
import { SigninComponent } from './signin/signin.component';
import { UsersComponent } from './users/users.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AdminComponent } from './admin/admin.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UserproductsComponent } from './Components/userproducts/userproducts.component';
import { FilterPipe } from './shared/filter.pipe';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { WayToComponent } from './way-to/way-to.component';
import { RegadminComponent } from './regadmin/regadmin.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroComponent,
    CoursesComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProductsAddComponent,
    ProductDetailComponent,
    ProductsComponent,
    DeleteComponent,
    SigninComponent,
    UsersComponent,
    DeleteUserComponent,
    AdminComponent,
    UploadFileComponent,
    UserproductsComponent,
    FilterPipe,
    CartComponent,
    CheckoutComponent,
    AdminListComponent,
    WayToComponent,
    RegadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  RouterModule.forRoot(applicationRoutes),
  FormsModule,
HttpClientModule,
ReactiveFormsModule

  ],
  providers: [UserproductsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
