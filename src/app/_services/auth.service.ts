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

constructor(private http: Http) {}

  login(model: any) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'login', model, options).pipe(map((response: Response) => {
      const user = response.json();
      if (user) {
        // passing token
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    }));
  }

  value() {
    return this.http.get('https://localhost:5001/api/values');
  }
}
