import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  // observables
  isAuthenticated$ = new BehaviorSubject<boolean>(true);
  profile$ = new BehaviorSubject<any>({});
  
  // new
  constructor(
    private authService: AuthService
  ) { 

    // check if a token
    if(this.authService.getToken()) {

      // check the token
      this.checkToken().subscribe(x => {
        if(x.success) {
          this.isAuthenticated$.next(true);
        } else {
          this.isAuthenticated$.next(false);
        }
      });
      
    } 
    
    // not authed
    else {
      this.isAuthenticated$.next(false);
    }    
  }

  // check token
  checkToken() : Observable<any> {

    // verify the token
    return this.authService.verify().pipe(map(x => {
      
      // check error response
      if(x.success) {
        
        // set state
        this.isAuthenticated$.next(true);
        window.localStorage.setItem('apps:token', x.token);
        this.profile$.next(this.authService.parseToken());

        // continute
        return {
          success: true
        };
      } 
      
      // else, fail
      else {
        return {
          success: false
        }
      }
    }));
  }

  // login
  login(model: any) : Observable<any> {

    // login
    return this.authService.login(model).pipe(map(x => {

      // check if ok
      if(x.success) {

        // set state
        this.isAuthenticated$.next(true);
        window.localStorage.setItem('apps:token', x.token);
        this.profile$.next(this.authService.parseToken());

        // next url
        let nextUrl = window.localStorage.getItem("apps:requestedUrl");
        if(!nextUrl || nextUrl == "/login" || nextUrl == "/logout") {
          nextUrl = "/";
        }

        // return ok
        return {
          success: true,
          nextUrl: nextUrl
        }
      }

      // else, return the error
      return x;
    }));
  }

  // log out
  logout(){

    // clear storage
    window.localStorage.removeItem("apps:token");
    window.localStorage.removeItem("apps:requestedUrl");

    // set state
    this.profile$.next(null);
    this.isAuthenticated$.next(false);
  }
}
