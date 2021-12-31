import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserContextService } from '../../../common/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AdminBillingGuard implements CanActivate {

  // new
  constructor(
    private userContext: UserContextService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userContext.hasBillingAccess$;
  }
}
