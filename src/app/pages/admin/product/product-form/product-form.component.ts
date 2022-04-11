import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup
  listCate: any
  action: String = "Thêm mới"
  previewUpload: any
  image: any
  selectUndefinedOptionValue: any
  oldImage: string = ""
  categotyId: number = 1
  id: any
  constructor(
    private cate: CategoryService,
    private ps: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.productForm = new FormGroup({
      id: new FormControl(""),
      product_name: new FormControl("", Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      quantity: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      discount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      desc: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      categoryId: new FormControl(this.categotyId, Validators.required)
    })

    this.id = this.activeRoute.snapshot.params['id']
    if (this.id != undefined) {
      this.action = "Cập nhật"
      this.ps.getOne(this.id).subscribe(data => {
        this.oldImage = data.image
        this.productForm = new FormGroup({
          id: new FormControl(data.id),
          product_name: new FormControl(data.product_name, Validators.required),
          price: new FormControl(data.price, [
            Validators.required,
            Validators.pattern('^[0-9]+$')
          ]),
          quantity: new FormControl(data.quantity, [
            Validators.required,
            Validators.pattern('^[0-9]+$')
          ]),
          discount: new FormControl(data.discount, [
            Validators.required,
            Validators.pattern('^[0-9]+$')
          ]),
          desc: new FormControl(data.desc, [
            Validators.required,
            Validators.minLength(6)
          ]),
          categoryId: new FormControl(data.categoryId, Validators.required)
        })
      })
    }
  }

  ngOnInit(): void {
    this.cate.get().subscribe(data => {
      this.listCate = data
    })
  }

  onSubmit(newProduct: any) {
    // this.image = <HTMLInputElement>document.getElementById("image")
    // const formData = new FormData()
    // formData.append('file', this.image.files[0])
    if (newProduct.id == "") {
      newProduct = {...newProduct, image: "bbbb", status: 0, view: 0}
      this.ps.insert(newProduct).subscribe(data => {
        alert("Thêm mới thành công!")
        this.router.navigate(["/admin/phones"])
      })
    } else {
      this.ps.getOne(this.id).subscribe(data => {
        let image = data.image
        if(this.previewUpload){
          image = "abc"
        }
        newProduct = { ...newProduct, image, status: data.status, view: data.view}
        this.ps.update(newProduct).subscribe(() => {
          alert("Cập nhật thành công!")
          this.router.navigate(["/admin/phones"])
        })
      })
    }
  }
  returnPage() {
    this.router.navigate(["/admin/phones"])
  }
  imageChange(event: any) {
    const endpoint = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      this.previewUpload = e.target?.result
    }
    reader.readAsDataURL(endpoint)
  }
}

