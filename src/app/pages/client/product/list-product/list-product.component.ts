import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {


  listCate: any
  listProduct: Array<any> = []
  listProductByView: any
  page: number = 1
  minPrice: any
  maxPrice: any
  arrFilterByPrice: Array<any> = []
  constructor(
    private cate: CategoryService,
    private ps: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(event => {
      const { cateName } = event
      if (cateName == undefined) {
        this.getAllProduct()
      } else {
        this.router.navigate(["phones/" + cateName])
        this.getProductBySlug(cateName)
      }
    })
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    this.cate.get().subscribe(data => {
      this.listCate = data
    })
    this.ps.getProductByView().subscribe(data => {
      this.listProductByView = data
    })
  }

  getProductBySlug(slug: String) {
    this.cate.getProductBySlug(slug).subscribe(data => {
      this.listProduct = data[0].products
    })
  }

  getAllProduct() {
    this.ps.get().subscribe((data) => {
      data.forEach((e: any) => {
        if (e.status == 1) {
          this.listProduct.push(e)
        }
      });
    })
  }
  currentListProduct = () => {
    this.listProduct.sort((a: any, b: any) => a.id < b.id ? -1 : (b.id < a.id ? 1 : 0))
    return this.listProduct
  }

  filterByPrice() {
    this.minPrice = $("#min_price").val()
    this.maxPrice = $("#max_price").val()
    this.arrFilterByPrice = []
    this.listProduct.forEach((e: any) => {
      if ((e.price - (e.price * e.discount / 100)) >= this.minPrice && (e.price - (e.price * e.discount / 100)) <= this.maxPrice) {
        this.arrFilterByPrice.push(e)
      }
    });
    this.listProduct = this.arrFilterByPrice
  }
  sortBy(event: any) {
    const targetSort = event.target.value

    switch (targetSort) {
      case '1':
        this.productNewest()
        break;
      case '2':
        this.sortByPriceLowToHigh()
        break;
      case '3':
        this.sortByPriceHighToLow()
        break;
      default:
        this.currentListProduct()
        break;
    }
  }

  productNewest() {
    this.listProduct.sort((a: any, b: any) => a.id < b.id ? -1 : (b.id < a.id ? 1 : 0))
    this.listProduct = this.listProduct.reverse()
  }
  sortByPriceLowToHigh() {
    this.listProduct.sort((a: any, b: any) => (a.price - (a.price * a.discount / 100)) < (b.price - (b.price * b.discount / 100)) ? -1 : (b.price - (b.price * b.discount / 100) < (a.price - (a.price * a.discount / 100)) ? 1 : 0))
  }
  sortByPriceHighToLow() {
    this.listProduct.sort((a: any, b: any) => (a.price - (a.price * a.discount / 100)) > (b.price - (b.price * b.discount / 100)) ? -1 : (b.price - (b.price * b.discount / 100) > (a.price - (a.price * a.discount / 100)) ? 1 : 0))
  }

  formatCurrency(data: any) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(data))
  }
}
