import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-admin-detail',
  templateUrl: './product-admin-detail.component.html',
  styleUrls: ['./product-admin-detail.component.css']
})
export class ProductAdminDetailComponent implements OnInit {

  productDetail: any
  id: any
  constructor(
    private ps: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id']
    this.getProductById()
  }

  getProductById(){
    this.ps.getOne(this.id, "category").subscribe(data => {
      this.productDetail = data
      console.log(this.productDetail)
    })
  }
  formatCurrency(data: number){
    return new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(Math.round(data))
  }
  returnPage(){
    this.router.navigate(["/admin/phones"])
  }

}
