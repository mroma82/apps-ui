import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  // observables
  isAuthenticated$ = new BehaviorSubject<boolean>(true);
  profile$ = new BehaviorSubject<any>({});

  // state
  token: string;
  
  // new
  constructor() { 

    // get the token
    this.token = window.localStorage.getItem('apps:token');

    // check if a token
    if(this.token) {

      // check the token
      this.checkToken(this.token).subscribe(x => {
        if(x.success) {
          this.isAuthenticated$.next(true);

          // set profile
          this.profile$.next(x.profile);

        } else {
          this.isAuthenticated$.next(false);
        }
      });
      
    } else {
      this.isAuthenticated$.next(false);
    }    
  }

  // check token
  checkToken(token: string) : Observable<any> {

    let profile = {
      username: this.token.split('|')[0],
      name: this.token.split('|')[1]
    };

    if( profile.username == "mroma") {
      return of({
        success: true,
        profile: profile
      });
    } else {
      return of({
        success: false
      });
    }
  }

  // login
  login(model: any) : Observable<any> {

    if( model.username == "mroma") {
      
      // next url
      let nextUrl = window.localStorage.getItem("apps:requestedUrl");
      window.localStorage.removeItem("apps:requestedUrl")
      if(!nextUrl) {
        nextUrl = "/";
      }
      this.token = `${model.username}|Michael Roma`;
      window.localStorage.setItem('apps:token', this.token);
      this.isAuthenticated$.next(true);
      return of({
        success: true,
        nextUrl: nextUrl
      });
    }
    else {
      return of({
        success: false,
        text: "Invalid username/password"
      });
    }
  }
}
