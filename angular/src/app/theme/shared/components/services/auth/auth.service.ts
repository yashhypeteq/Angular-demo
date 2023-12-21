import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.headers,
    withCredentials: true
  };
  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post<any>(`${this.url}/login`, body);
  }

  signup(body: any) {
    return this.http.post<any>(`${this.url}/signup`, body);
  }
}
