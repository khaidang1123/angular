import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() header: EventEmitter<any>;
  listCate: any
  listSearch: any
  listCart: any
  userDetail: any
  listProductShow: Array<any> = []

  constructor(
    private cate: CategoryService,
    private ps: ProductService,
    private cart: CartService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.header = new EventEmitter()
  }

  ngOnInit(): void {
    this.getUser()
    this.cate.get().subscribe(data => {
      this.listCate = data
    })
    this.cart.get().subscribe(data => {
      this.listCart = data
    })

    $(window.onload = () => {

      $(window.onscroll = () => {
        if (scrollY > 25) {
          $(".header_bottom").addClass("sticky");
          $(".about-page").css('top', '590px')
          $('.form_cart').addClass('sub-cart')
        } else {
          $(".header_bottom").removeClass("sticky");
          $(".about-page").css('top', '640px');
          $('.form_cart').removeClass('sub-cart')
        }
        if (scrollY >= 50) {
          $(".gototop").addClass("btn_gototop");
        }
        else {
          $(".gototop").removeClass("btn_gototop");
        }
        if (scrollY < 2100 || scrollY > 3400) {
          $(".background-main-content").removeClass("active_sub")
          $("video").attr("src", "")
        }
      });
    })
    $("#top_search li span").click((e) => {
      $("#input_search").val(e.target.innerHTML)
      this.onSearch(e.target.innerHTML)
    })
  }

  getUser() {
    const userStorage = localStorage.getItem("google_account")
    if (userStorage) {
      this.userDetail = JSON.parse(userStorage)
    } else {
      this.userDetail = undefined
    }

  }
  signOut() {
    $(".subShowUser").css({
      "visibility": "hidden",
      "transition": "0s"
    })
    localStorage.removeItem('google_account')
    this.getUser()
  }

  searchVal = ""
  onSearch(e: any) {
    $("#top_search").css('display', 'none')
    $(".list_search").css('display', 'block')
    if (typeof e != 'string') {
      this.searchVal = e.target.value;
    } else {
      this.searchVal = e
    }
    if (this.searchVal == '') {
      $("#top_search").css('display', 'block')
      $(".list_search").css('display', 'none')
    }
    this.ps.get().subscribe(data => {
      console.log(data)
      this.listProductShow.push(data)
      this.listSearch = data.filter((product: any) => {
        const usernameLowerCase = product.product_name.toLowerCase()
        const searchValLowerCase = this.searchVal.toLowerCase().trim()
        return usernameLowerCase.indexOf(searchValLowerCase) !== -1
      })
    })
  }

  showCart() {
    $(".cart-theme").addClass('cart-theme-active')
    $(".layer-cart").addClass('layer-cart-active')
    $("body").css({
      'position': 'fixed',
      'width': '100%'
    })
  }
  closeSearch() {
    $("#input_search").val("")
    this.onSearch("")
  }
  formatCurrency(data: any) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data)
  }
  closeCart() {
    $(".cart-theme").removeClass('cart-theme-active')
    $(".layer-cart").removeClass('layer-cart-active')
    $("body").css('position', 'static')
  }

  gotop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

}
