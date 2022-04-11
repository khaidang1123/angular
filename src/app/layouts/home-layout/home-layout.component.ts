import { APP_BASE_HREF } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as $ from 'jquery'
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: [
    './home-layout.component.css',
    '../../app.component.css']
})

export class HomeLayoutComponent implements OnInit {

  listSearch: any
  listCate: any;
  listCart: any
  constructor(
    private ps: ProductService,
    private cate: CategoryService,
    private cart: CartService) {
  }

  ngOnInit(): void {

  }
}
