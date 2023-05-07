import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: Login) {
    let url = `http://localhost:8081/login/login`;
    return this.http.post(url, data);
  }
}
