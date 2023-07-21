import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  url = 'http://65.0.155.254:5001/';

  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post(`${this.url}test/auth/login`, data);
  }

  importData(importData): Observable<any> {
    return this.http.post(`${this.url}admin/department/import`, importData);
  }

  getListData() {
    return this.http.get(`${this.url}admin/department/list`);
  }

  addData(formData): Observable<any> {
    return this.http.post(`${this.url}admin/department/add`, formData);
  }

  updateData(updatedId): Observable<any> {
    return this.http.post(`${this.url}admin/department/update`, updatedId);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
}
