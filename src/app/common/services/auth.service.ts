import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable, of } from 'rxjs';
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
  impersonate(userId: string) : Observable<any> {
    return this.http.postAsActualUser(`/auth/impersonate/${userId}`, null);
  }

  // save
  save(model: any): Observable<any> {
    return this.http.post(`/auth/update`, null);
  }

  // send password setup
  sendPasswordSetup(request: { username: string }) : Observable<any> {
    return this.http.post(`/auth/sendPasswordSetup`, request);
  }

  // send password setup by id
  sendPasswordSetupById(userId: string) : Observable<any> {
    return this.http.post(`/auth/sendPasswordSetupById/${userId}`, null);
  }

  // validate password setup
  validatePasswordSetup(request: { userId: string, setupId: string }) : Observable<any> {
    return this.http.post("/auth/validatePasswordSetup", request);
  }

  // update password from setup
  updatePasswordFromSetup(request: { userId: string, setupId: string, password: string }) : Observable<any> {
    return this.http.post("/auth/updatePasswordFromSetup", request);
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

  // get admin roles
  getAdminRoles() : Observable<any> {
    return this.http.get("/auth/getAdminRoles");
  }


  // get groups
  getGroups() : Observable<any> {
    return this.http.get("/auth/getGroups");
  }

  // get user permissions
  getUserPermissions() : Observable<any> {
    return this.http.get("/auth/getUserPermissions");
  }

  // upate user permission
  updateUserPermission(model: any ) : Observable<any> {
    return this.http.post("/auth/updateUserPermission", model);
  }

  // get full name
  getUserFullName(userId: string) : Observable<any> {
    if(!userId) 
      return of({ fullName: "" });
    return this.http.get(`/auth/getUserFullName/${userId}`);
  }
}
