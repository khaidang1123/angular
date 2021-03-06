import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:3000/products/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(apiUrl)
  }
  getOne(id: Number | String): Observable<any>{
    return this.http.get(apiUrl+`${id}?_expand=category`)
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
  getProductSales(start: Number, end: Number): Observable<any>{
    return this.http.get(apiUrl+`?_sort=discount&_order=desc,_start=${start}&_end=${end}`)
  }
  getProductByGender(model: Number, limit: any = ''){
    return this.http.get(apiUrl+`?model=${model}&_limit=${limit}`)
  }
  getProductByView(){
    return this.http.get(apiUrl+`?_sort=view&_limit=5`)
  }
  productPagination(){
    return this.http.get(apiUrl+`?_page=1&_limit=12`)
  }
  productBestSeller(){
    return this.http.get(apiUrl+`?_embed=order_detail`)
  }
}
