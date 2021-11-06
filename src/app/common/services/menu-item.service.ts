import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';
import { debounce, filter, map, mergeMap } from 'rxjs/operators';
import { SecurityService } from './security.service';
import { combineLatest, Observable, of, timer } from 'rxjs';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { SecurityPermissionMask } from '../enums/security-permission-mask';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService implements OnDestroy {

  // app menu items
  readonly appMenuItems = combineLatest([

    // apps
    this.createEntityApp(EntityTypes.Example)
  ]);

  // setup menu items
  readonly setupMenuItems = combineLatest([

    of({
      title: "Admin", description: "Manage users and global settings",
      url: "/app/admin", icon: "fas fa-cogs",
      hasAccess$: this.userContext.isAdmin$
    }),

    this.createEntityApp(EntityTypes.SystemUser),
    this.createEntityApp(EntityTypes.SecurityRole)
  ])

  // admin menu items
  readonly adminMenuItems = combineLatest([
    this.createEntityApp(EntityTypes.ListItemType),
    this.createEntityApp(EntityTypes.SecurityRole),
    this.createEntityApp(EntityTypes.SystemUser),
    this.createEntityApp(EntityTypes.WorkflowGroup),
    this.createEntityApp(EntityTypes.NumberSequence)
  ]);

  // observables
  appMenuItems$: Observable<IMenuItem[]>;
  setupMenuItems$: Observable<IMenuItem[]>;
  adminMenuItems$: Observable<IMenuItem[]>;

  // new
  constructor(
    private userContext: UserContextService,
    private securityService: SecurityService,
    private entityApi: EntityApiService,
    private entityProvider: EntityProviderService
  ) {

    // setup app menu items
    this.appMenuItems$ = combineLatest(
      userContext.profile$,
      this.appMenuItems
    ).pipe(debounce(() => timer(100)), map(([, appsMenu]) => {
      return [
        ...appsMenu,
      ].filter(x => x !== null)
    }));

    // setup setup menu items
    this.setupMenuItems$ = combineLatest(
      userContext.profile$,
      this.setupMenuItems
    ).pipe(debounce(() => timer(100)), map(([, setupMenu]) => {
      return [
        ...setupMenu,
      ].filter(x => x !== null)
    }));

    // setup admin menu items
    this.adminMenuItems$ = combineLatest(
      userContext.profile$,
      this.adminMenuItems
    ).pipe(debounce(() => timer(100)), map(([, menu]) => {
      return menu.filter(x => x !== null)
    }));
  }

  // cleanup
  ngOnDestroy() { }

  // function that adds an entity app
  createEntityApp(entityTypeId: string): Observable<IMenuItem> {
    return this.entityProvider.getEntity(entityTypeId).pipe(map(x => {

      // null safe
      if (!x)
        return null;

      // build the menu item
      return {
        title: x.pluralName,
        url: x.rootUrl,
        icon: x.icon,
        description: x.description,
        hasAccess$: this.entityApi.hasAccess(entityTypeId, SecurityPermissionMask.View)
      }
    }));
  }
}