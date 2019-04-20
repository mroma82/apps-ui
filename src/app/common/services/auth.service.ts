import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // const
  TOKEN_KEY: string = "apps:token";

  constructor(
    private apiClient: AppHttpClientService
  ) { }

  // token
  getToken() { 
    return window.localStorage.getItem(this.TOKEN_KEY); 
  }

  // set token
  setToken(token: string) {
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  // clear token
  clearToken() {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  // verify token
  verify() : Observable<any> {

    // convert the response
    return this.apiClient.get("/auth/verify").pipe(map(x => {
      
      // check error response
      if(x instanceof HttpErrorResponse) {
        return {
          success: false
        };
      } 

      // else, ok
      else {
        return {
          success: true,
          token: x.token
        };
      }
    }));
  }

  // login
  login(model: any): Observable<any> {
    return this.apiClient.post("/auth/login", model);
  }

  // parse token
  parseToken() : any {
    let model = jwt_decode(this.getToken());
    console.log(model);
    return model;
  }
}
