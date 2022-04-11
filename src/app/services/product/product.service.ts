import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:3000/products/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  get(tableJoin = ""): Observable<any> {
    return this.http.get(apiUrl+`?_expand=${tableJoin}`)
  }
  getOne(id: Number | String, tableJoin = ""): Observable<any>{
    return this.http.get(apiUrl+`${id}?_expand=${tableJoin}`)
  }
  insert(data: any): Observable<any>{
    return this.http.post(apiUrl, data)
  }
  update(data: any): Observable<any>{
    return this.http.put(apiUrl+data.id, data)
  }
  delete(id: Number | String): Observable<any>{
    return this.http.delete(apiUrl+id)
  }
  getProductSales(start: Number | String | '', end: Number | String = ''): Observable<any>{
    return this.http.get(apiUrl+`?status=1&_sort=discount&_order=desc,_start=${start}&_end=${end}`)
  }
  getProductByCate(cate: Number, limit: any = ''){
    return this.http.get(apiUrl+`?status=1&categoryId=${cate}&_limit=${limit}`)
  }
  getProductByView(){
    return this.http.get(apiUrl+`?status=1&_sort=view&_order=desc&_limit=5`)
  }
  getProductPrice(orderBy: String){
    return this.http.get(apiUrl+`?status=1&_sort=price&_order=${orderBy}`)
  }
  productBestSeller(){
    return this.http.get(apiUrl+`?status=1&_embed=order_detail`)
  }

}
