import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup
  id: any
  dataUpdate: any
  constructor(
    private cate: CategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      cate_name: new FormControl('')
    })
    this.id = this.activeRoute.snapshot.params['id']
    if (this.id != undefined) {
      this.cate.getOne(this.id).subscribe(data => {
        this.dataUpdate = data
        this.categoryForm = new FormGroup({
          id: new FormControl(this.dataUpdate.id),
          cate_name: new FormControl(this.dataUpdate.cate_name)
        })
      })
    }
  }

  ngOnInit(): void {

  }

  onSubmit(data: any) {
    if(this.id != undefined){
      this.cate.update(data).subscribe(data => {
        alert('Cập nhật dữ liệu thành công!')
        this.router.navigate(["/admin/category"])
      })
    }else{
      this.cate.insert(data).subscribe(data => {
        alert('Thêm mới dữ liệu thành công!')
        this.router.navigate(["/admin/category"])
      })
    }
  }

}
