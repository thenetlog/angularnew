import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:5001/api/auth/';
  userToken: any;

  constructor(private http: Http) { }

  value() {
    return this.http.get('https://localhost:5001/api/values');
  }

  private options() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({headers: headers});
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.options()).pipe(map((response: Response) => {
      const user = response.json();
      if (user) {
        // passing token
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.options());
  }
}
