import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post('http://65.0.155.254:5001/test/auth/login', data);
  }

  importData(importData): Observable<any> {
    return this.http.post(
      'http://65.0.155.254:5001/admin/department/import',
      importData
    );
  }

  isLoggedIn() {
    const x = localStorage.getItem('token') != null;

    return x;
  }
  getToken() {
    return localStorage.getItem('token') || '';
  }

  getListData() {
    return this.http.get(`http://65.0.155.254:5001/admin/department/list`);
  }
}
