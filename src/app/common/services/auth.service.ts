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

  // tokens
  private token = () => window.localStorage.getItem("apps:token"); 
  private tokenImpersonated = () => window.localStorage.getItem("apps:token:impersonate"); 

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // return actual token
  getActualToken() : string {
    return this.token();
  }
  
  // verify token
  verify() : Observable<any> {

    // convert the response
    return this.http.getAsActualUser("/auth/verify").pipe(map(x => {
      
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
    return this.http.postAsActualUser("/auth/login", model);
  }

  // impersonate
  impersonate(username: string) : Observable<any> {
    return this.http.postAsActualUser(`/auth/impersonate/${username}`, null);
  }

  // parse token
  parseToken(token: string) : any {
    let model = jwt_decode(token);
    console.log(model);
    return model;
  }

  // get users
  getUsers() : Observable<any> {
    return this.http.get("/auth/getUsers");
  }

  // get groups
  getGroups() : Observable<any> {
    return this.http.get("/auth/getGroups");
  }
}
