import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { SliderService } from 'src/app/services/slider/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  bestSeller: Array<any> = []
  aos_delay = "100";
  newProduct: Array<any> = [];
  sliderBestSeller: Array<any> = []
  listBestSeller: Array<any> = []
  apple: any;
  samsung: any;
  hotSale: any;
  sliders: any;
  duration: Number = 100
  constructor(
    private ps: ProductService,
    private sls: SliderService,
  ) { }
  ngOnInit(): void {
    this.ps.get().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].status == 1) {
          this.newProduct.push(data[i])
        }
        if (this.newProduct.length > 2) break;
      }
    })
    this.ps.getProductByCate(1, 5).subscribe(data => {
      this.apple = data
    })
    this.ps.getProductByCate(2, 5).subscribe(data => {
      this.samsung = data
    })
    this.ps.getProductSales(0, 10).subscribe(data => {
      this.hotSale = data
    })
    this.ps.productBestSeller().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].order_detail.length > 0) {
          this.bestSeller.push(data[i])
        }
      }
      this.bestSeller.sort((a: any, b: any) => a.order_detail.length > b.order_detail.length ? -1 : (b.order_detail.length > a.order_detail.length ? 1 : 0))
      const arrBestSeller = this.bestSeller.slice(0, 5)
      this.sliderBestSeller = arrBestSeller.slice(0, 3)
      this.listBestSeller = arrBestSeller.slice(3, 5)
    })


  }
  discoverSub() {
    $(".background-main-content").addClass("active_sub")
    $("video").attr("src", "assets/image/product/banner_sub.mp4")
    $("#video-background").attr("autoplay", 'true')
  }

  bestSellerSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    "autoplay": true,
    "autoplaySpeed": 2000,
    Infinity: true,
    prevArrow: "<i class='fa fa-angle-left' style='transition: 0.4s;opacity: 1;position: absolute;top: 40%;left: 2%;font-size: 35px;z-index: 3;cursor: pointer;padding: 10px;'></i>",
    nextArrow: "<i class='fa fa-angle-right'style='transition: 0.4s;opacity: 1;position: absolute;top: 40%;right: 2%;font-size: 35px;z-index: 3;cursor: pointer;padding: 10px;' ></i>",
  }
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    "autoplay": true,
    "autoplaySpeed": 2000,
    Infinity: true,
    prevArrow: "<i class='fa fa-angle-left' style='transition: 0.4s;opacity: 1;position: absolute;top: 40%;left: -10px;font-size: 35px;z-index: 3;cursor: pointer;padding: 10px;'></i>",
    nextArrow: "<i class='fa fa-angle-right'style='transition: 0.4s;opacity: 1;position: absolute;top: 40%;right: -10px;font-size: 35px;z-index: 3;cursor: pointer;padding: 10px;' ></i>",
  };
  formatCurrency(data: any) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(data))
  }
}
