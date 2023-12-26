import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // });

  // options = {
  //   headers: this.headers,
  //   withCredentials: true
  // };
  constructor(private http: HttpClient) {}

  addProduct(body: any) {
    return this.http.post<any>(`${this.url}/product`, body);
  }

  getProductById(pid: any) {
    if (pid) return this.http.get<any>(`${this.url}/product/` + pid);
    else return this.http.get<any>(`${this.url}/product/0` + pid);
  }

  getProduct() {
    return this.http.get<any>(`${this.url}/products`);
  }

  updateProduct(pid: any, body: any) {
    return this.http.put<any>(`${this.url}/product/` + pid, body);
  }

  deleteProduct(pid: any) {
    return this.http.delete<any>(`${this.url}/product/` + pid);
  }
}
