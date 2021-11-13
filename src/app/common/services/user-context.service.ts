import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { IUserProfile } from '../models/user-profile';
import { AuthService } from './auth.service';
import { InstanceContextService } from './instance-context.service';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  // state
  verify$ = new BehaviorSubject<boolean>(null);
  profile$ = new BehaviorSubject<IUserProfile>(null);
  adminRoles$: Observable<any>;

  // is authenticated formula
  isAuthenticated$ = combineLatest([this.verify$, this.profile$]).pipe(filter(([verify]) => verify != null), map(([, profile]) => profile != null));

  // is admin
  isAdmin$: Observable<any>;

  isImpersonating$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private authService: AuthService,
    private instanceContext: InstanceContextService
  ) {

    // admin roles
    this.adminRoles$ = authService.getAdminRoles().pipe(shareReplay(1));

    // is authenticated
    this.isAuthenticated$ = combineLatest([this.verify$, this.profile$]).pipe(
      filter(([verify]) => verify != null),
      map(([, profile]) => profile != null)
    );

    // is admin observable
    this.isAdmin$ = combineLatest([this.profile$, this.adminRoles$]).pipe(map(
      ([profile, adminRoles]) => {

        // check if all the data
        if (profile == null || profile.roles == null || adminRoles == null)
          return false;

        // if more than one role, check all roles
        return profile.roles.filter(x => adminRoles.indexOf(x)).length > 0;
      }
    ));

    // check if a token
    if (this.authService.getActualToken()) {

      // check the token
      this.checkToken().subscribe();
    }

    // not authed
    else {
      //verified
      this.verify$.next(true);
    }
  }

  // check token
  checkToken(): Observable<any> {

    // verify the token
    return this.authService.verify().pipe(map(x => {

      // check error response
      if (x.success) {

        // set state
        //this.isAuthenticated$.next(true);
        window.localStorage.setItem('apps:token', x.token);


        // set profile
        this.setProfile(this.authService.parseToken(x.token));

        // check if impersonating
        let impersonateToken = window.localStorage.getItem('apps:token:impersonate');
        if (impersonateToken) {
          this.profile$.next(this.authService.parseToken(impersonateToken));
          this.isImpersonating$.next(true);
        }

        //verified
        this.verify$.next(true);

        // continute
        return {
          success: true
        };
      }

      // else, fail
      else {
        //verified
        this.verify$.next(true);

        return {
          success: false
        }
      }


    }));
  }

  // login
  login(model: any): Observable<any> {

    // login
    return this.authService.login(model).pipe(map(x => {

      // check if ok
      if (x.success) {

        // set state
        //this.isAuthenticated$.next(true);
        window.localStorage.setItem('apps:token', x.token);
        window.localStorage.removeItem("apps:token:impersonate");
        this.isImpersonating$.next(false);

        // set profile
        let profile = this.authService.parseToken(x.token);
        this.setProfile(profile);

        // next url
        let nextUrl = window.localStorage.getItem("apps:requestedUrl");
        if (!nextUrl || nextUrl == "/login" || nextUrl == "/logout") {
          nextUrl = "/";
        }

        // set instance
        this.instanceContext.instanceId = profile.instance;

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
  logout() {

    // clear storage
    window.localStorage.removeItem("apps:token");
    window.localStorage.removeItem("apps:token:impersonate");
    window.localStorage.removeItem("apps:requestedUrl");

    // set state
    this.profile$.next(null);
    //this.isAuthenticated$.next(false);
    //this.isAdmin$.next(false);
    this.isImpersonating$.next(false);
  }

  // simulate user
  simulateUser(userId: string) {

    // impersonate
    this.authService.impersonate(userId).subscribe(x => {

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
  setProfile(profile: IUserProfile) {
    this.profile$.next(profile);
  }

  // has access 
  hasAccess(key: string): Observable<boolean> {

    // stream with the profile
    return this.profile$.pipe(map(profile => {

      // check if no profile or roles
      if (!profile || !profile.roles)
        return false;

      // else, check if admin or has the key
      return profile.roles.indexOf(key) > -1 || profile.roles.indexOf("SysAdmin") > -1;
    }));
  }

  // start the setup password process
  sendPasswordSetup(username: string): Observable<any> {
    return this.authService.sendPasswordSetup({
      username: username
    });
  }

  // send password setup by id
  sendPasswordSetupById(userId: string): Observable<any> {
    return this.authService.sendPasswordSetupById(userId);
  }
}
