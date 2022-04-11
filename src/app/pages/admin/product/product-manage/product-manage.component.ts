import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {

  listProduct: any
  page: number = 1
  constructor(
    private ps: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct() {
    this.ps.get("category").subscribe(data => {
      this.listProduct = data
    })
  }

  onDelete(id: number) {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?")
    if (!confirm) return;
    this.ps.delete(id).subscribe(() => {
      this.getProduct()
    })
  }
  formatCurrency(data: number) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Math.round(data))
  }
  changeStatus(event: number, product: any) {
    this.ps.getOne(product.id).subscribe(data => {
      const newProduct = { ...data, status: event }
      this.ps.update(newProduct).subscribe((data) => {
        this.getProduct()
      })
    })
  }
}
