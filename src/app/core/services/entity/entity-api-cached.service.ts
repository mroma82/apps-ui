import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserContextService } from '../../../common/services/user-context.service';
import { EntityApiService } from './entity-api.service';

@Injectable({
  providedIn: 'root'
})
export class EntityApiCachedService implements OnDestroy {

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private userContext: UserContextService,
    private api: EntityApiService
  ) {

    // clear cache on profile change
    const onProfileChange = this.userContext.profile$.subscribe(x => this.clearCache());
    this.subs.add(onProfileChange);
  }

  // clear
  clearCache() {
    this._types = null;
    this._hasAccess = {};
  }

  // get all types
  private _types: Observable<any> = null;
  getTypes(): Observable<any> {
    if (!this._types)
      return this._types = this.api.getTypes().pipe(shareReplay());
    return this._types;
  }

  // has access
  private _hasAccess = {};
  hasAccess(entityTypeId: string, permissionsMask: number): Observable<boolean> {

    // seed cache
    const key = `${entityTypeId}|${permissionsMask}`;
    if (!this._hasAccess[key])
      this._hasAccess[key] = this.api.hasAccess(entityTypeId, permissionsMask).pipe(shareReplay());
    return this._hasAccess[key];
  }

  // cleanup 
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
