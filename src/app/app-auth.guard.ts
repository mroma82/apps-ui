import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserContextService } from './common/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {

  // new
  constructor(
    private router: Router,
    private userContext: UserContextService
  ) { }

  // can activate
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    // subcribe to auth changes
    this.userContext.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        localStorage.setItem("apps:requestedUrl", window.location.pathname);
        this.router.navigate(["/login"]);
      }
    });

    return this.userContext.isAuthenticated$;
  }

}
