import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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

  // return from our server for our request to API
  private handleError(error: any) {
    const applicationError = error.headers.set('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.options()).pipe(map((response: Response) => {
      const user = response.json();
      if (user) {
        // passing token
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    })).catch(this.handleError);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.options()).catch(this.handleError);
  }
}
