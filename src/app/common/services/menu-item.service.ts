import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';
import { debounce, map, mergeMap } from 'rxjs/operators';
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

  // foundation menu
  readonly foundationMenu : IMenuItem[] = [
    { 
      title: "Admin", description: "Manage users and global settings",
      url: "/app/admin", icon: "fas fa-cogs", 
      hasAccess$: this.userContext.isAdmin$
    }
  ];


  // app menu items
  readonly appMenuItems = combineLatest(

    // apps
    this.createEntityApp(EntityTypes.Example),
    this.createEntityApp(EntityTypes.SystemUser)
  );

  // admin menu items
  readonly adminMenuitems = combineLatest(
    this.createEntityApp(EntityTypes.ListItemType),
    this.createEntityApp(EntityTypes.SecurityRole),
    this.createEntityApp(EntityTypes.SystemUser),
    this.createEntityApp(EntityTypes.WorkflowGroup),
  );

  // observables
  menuItems$ : Observable<IMenuItem[]>;
  adminMenuItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private userContext: UserContextService,
    private securityService: SecurityService,
    private entityApi: EntityApiService,
    private entityProvider: EntityProviderService
  ) { 

    // setup menu items
    this.menuItems$ = combineLatest(
      userContext.profile$,
      this.appMenuItems,
      of(this.foundationMenu)
    ).pipe(debounce(() => timer(100)), map(([,appsMenu, foundationMenu]) => {
      return [
        ...appsMenu,
        ...foundationMenu
      ]
    }));    

    // setup admin menu items
    this.adminMenuItems$ = combineLatest(
      userContext.profile$,
      this.adminMenuitems
    ).pipe(debounce(() => timer(100)), map(([,menu]) => {
      return menu
    }));    
  }    

  // cleanup
  ngOnDestroy() {

  }

  // function that adds an entity app
  createEntityApp(entityTypeId: string) : Observable<IMenuItem> {
    return this.entityProvider.getEntity(entityTypeId).pipe(map(x => { return {
      title: x.pluralName,
      url: x.rootUrl,
      icon: x.icon,
      description: x.description,
      hasAccess$: this.entityApi.hasAccess(entityTypeId, SecurityPermissionMask.View)
    }}));
  }
}