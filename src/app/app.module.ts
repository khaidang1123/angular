import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ProductService } from './services/product/product.service'; 
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryService } from './services/category/category.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule  } from '@angular/material/paginator';
import { MatTableModule  } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductManageComponent } from './pages/admin/product/product-manage/product-manage.component';
import { CategoryFormComponent } from './pages/admin/category/category-form/category-form.component'
import { CategoryManageComponent } from './pages/admin/category/category-manage/category-manage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './components/admin/admin.component';
import { ProductDetailComponent } from './pages/client/product/product-detail/product-detail.component';
import { ListProductComponent } from './pages/client/product/list-product/list-product.component';
import { HomeComponent } from './pages/client/home/home.component';
import { ProductFormComponent } from './pages/admin/product/product-form/product-form.component';
import { UserManageComponent } from './pages/admin/user/user-manage/user-manage.component';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { StatusBtnComponent } from './components/status-btn/status-btn.component';
import { CategoryDetailComponent } from './pages/admin/category/category-detail/category-detail.component';
import { HeaderComponent } from './components/client/header/header.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { BannerComponent } from './components/client/banner/banner.component';
import { LoginComponent } from './pages/client/login/login.component';
import { RegisterComponent } from './pages/client/register/register.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProductAdminDetailComponent } from './pages/admin/product/product-admin-detail/product-admin-detail.component';
import { ShowValidateComponent } from './components/show-validate/show-validate.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLayoutComponent,
    ListProductComponent,
    ProductDetailComponent,
    DashboardLayoutComponent,
    DashboardComponent,
    CategoryManageComponent,
    ProductManageComponent,
    CategoryFormComponent,
    AdminComponent,
    ProductFormComponent,
    UserManageComponent,
    StatusBtnComponent,
    CategoryDetailComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    ProductAdminDetailComponent,
    ShowValidateComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    ProductService,
    CategoryService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '739897525655-hv7bt0nq5ectdkcvh8j7kd2hm5fhqlt7.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
