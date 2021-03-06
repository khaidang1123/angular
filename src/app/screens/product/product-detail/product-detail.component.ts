import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail: any
  status: any
  model: any
  brand: any;
  productByCate: any
  productInvolveSlideConfig: any
  currentQuantity: any = 1
  offsetTop: any
  constructor(
    private activeRoute: ActivatedRoute,
    private ps: ProductService,
    private cate: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id']
    this.ps.getOne(id).subscribe(data => {
      this.productDetail = data
      this.status = this.productDetail.quantity > 0 ? 'Còn hàng' : 'Hết hàng'
      this.model = this.productDetail.model == 0 ? 'Nam' : 'Nữ'
      this.cate.getProductByCate(this.productDetail.categoryId).subscribe(data => {
        this.productByCate = data.products
      })
    })

    window.onload = () => {
      let itemPerScreen;
      if (this.productByCate.length >= 4) {
        itemPerScreen = 4
      } else {
        itemPerScreen = this.productByCate.length
      }
      console.log(itemPerScreen)
      this.productInvolveSlideConfig = {
        slidesToShow: 4,
        slidesToScroll: 1,
        "autoplay": true,
        "autoplaySpeed": 2000,
        Infinity: true,
        prevArrow: "<i class='fa fa-angle-left'></i>",
        nextArrow: "<i class='fa fa-angle-right'style='transition: 0.4s;opacity: 1;position: absolute;top: 50%;right: -1%;font-size: 35px;z-index: 3;cursor: pointer;padding: 10px;' ></i>",
      }
    }
  }

  onChangeQuantity(e: any) {
    if (e.target.value > 9998) {
      e.target.value = 9999
    }
    if (e.target.value < 2 && e.target.value != '') {
      e.target.value = 1
    }
    this.currentQuantity = e.target.value
    console.log(e.target.value)
  }
  plus_quantity() {
    this.currentQuantity++;
    if (this.currentQuantity > 9998) {
      this.currentQuantity = 9999
    }
  }
  minus_quantity() {
    this.currentQuantity--;
    if (this.currentQuantity < 2) {
      this.currentQuantity = 1
    }
  }

  addtocart() {
    let image = $('#addtocart').parent('.btn').parent('.content').parent('.main_content').find('img').eq(0)
    let cart = $('.cart i')
    this.offsetTop = image.offset()?.top
    if (image) {
      let imgClone = image.clone().offset({
        top: this.offsetTop
      }).css({
        'opacity': '0.8',
        'position': 'absolute',
        'left': '350px',
        'width': '100px',
        'height': '100px',
        'z-index': '100',
      }).appendTo($('body')).animate({
        'top': cart.offset()?.top,
        'left': cart.offset()?.left,
        'width': 50,
        'height': 50
      }, 1000)

      imgClone.animate({
        'width': 0,
        'height': 0
      }, function () {
        $(this).detach()
      });
    }
  }

  formatCurrency(data: any) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data)
  }
}
