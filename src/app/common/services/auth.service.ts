import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { IUserProfile } from '../models/user-profile';
import { isArray } from 'ngx-bootstrap';

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
  getActualToken(): string {
    return this.token();
  }

  // verify token
  verify(): Observable<any> {

    // convert the response
    return this.http.getAsActualUser("/auth/verify").pipe(map(x => {

      // check error response
      if (x instanceof HttpErrorResponse) {
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
  impersonate(userId: string): Observable<any> {
    return this.http.postAsActualUser(`/auth/impersonate/${userId}`, null);
  }

  // save
  save(model: any): Observable<any> {
    return this.http.post(`/auth/update`, null);
  }

  // send password setup
  sendPasswordSetup(request: { username: string }): Observable<any> {
    return this.http.post(`/auth/sendPasswordSetup`, request);
  }

  // send password setup by id
  sendPasswordSetupById(userId: string): Observable<any> {
    return this.http.post(`/auth/sendPasswordSetupById/${userId}`, null);
  }

  // validate password setup
  validatePasswordSetup(request: { userId: string, setupId: string }): Observable<any> {
    return this.http.post("/auth/validatePasswordSetup", request);
  }

  // update password from setup
  updatePasswordFromSetup(request: { userId: string, setupId: string, password: string }): Observable<any> {
    return this.http.post("/auth/updatePasswordFromSetup", request);
  }

  // parse token
  parseToken(token: string): IUserProfile {

    // model
    var model = jwt_decode(token);

    // convert to model
    return {
      instance: model.instance,
      userId: model.userId,
      fullName: model.fullName,
      email: model.email,
      roles: isArray(model.role) ? model.role : [model.role]
    };
  }

  // get users
  getUsers(): Observable<any> {
    return this.http.get("/auth/getUsers");
  }

  // get admin roles
  getAdminRoles(): Observable<any> {
    return this.http.get("/auth/getAdminRoles");
  }

  // get full name
  getUserFullName(userId: string): Observable<any> {
    if (!userId)
      return of({ fullName: "" });
    return this.http.get(`/auth/getUserFullName/${userId}`);
  }
}
