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
  isAdmin$ = new BehaviorSubject<boolean>(false);
  profile$ = new BehaviorSubject<any>({});
  isImpersonating$ = new BehaviorSubject<boolean>(false);
  
  // new
  constructor(
    private authService: AuthService
  ) { 

    // check if a token
    if(this.authService.getActualToken()) {

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
        
        
        // set profile
        this.setProfile(this.authService.parseToken(x.token));        

        // check if impersonating
        let impersonateToken = window.localStorage.getItem('apps:token:impersonate');
        if(impersonateToken) {
          this.profile$.next(this.authService.parseToken(impersonateToken));
          this.isImpersonating$.next(true);
        }

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
        window.localStorage.removeItem("apps:token:impersonate");
        this.isImpersonating$.next(false);

        // set profile
        this.setProfile(this.authService.parseToken(x.token));

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
    window.localStorage.removeItem("apps:token:impersonate");
    window.localStorage.removeItem("apps:requestedUrl");

    // set state
    this.profile$.next(null);
    this.isAuthenticated$.next(false);
    this.isAdmin$.next(false);
    this.isImpersonating$.next(false);
  }

  // simulate user
  simulateUser(username: string) {

    // impersonate
    this.authService.impersonate(username).subscribe(x => {

      // set token and overwrite profile
      window.localStorage.setItem('apps:token:impersonate', x.impersonateToken);
      this.profile$.next(this.authService.parseToken(x.impersonateToken));
      this.isImpersonating$.next(true);
    });
  }

  // clear impersonate
  clearImpersonate() {
    window.localStorage.removeItem("apps:token:impersonate");
    this.profile$.next(this.authService.parseToken(window.localStorage.getItem('apps:token')));    
    this.isImpersonating$.next(false);
  }

  // set profile
  setProfile(profile: any) {
    this.profile$.next(profile);
    this.isAdmin$.next(profile.role.indexOf("SysAdmin") > -1);
  }
}
