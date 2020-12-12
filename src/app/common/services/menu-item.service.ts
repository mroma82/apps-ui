import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';
import { debounce, map, mergeMap } from 'rxjs/operators';
import { SecurityService } from './security.service';
import { combineLatest, Observable, of, timer } from 'rxjs';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { SecurityPermissionMask } from '../enums/security-permission-mask';

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

    // example
    this.createEntityApp("e1d39dfa-2940-4434-a7e4-2c85d2d2fe47"),
    this.createEntityApp("4ecc715d-8240-4498-8554-78099ca9f019")
  );

  // observables
  menuItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private userContext: UserContextService,
    private securityService: SecurityService,
    private entityApi: EntityApiService,
    private entityProvider: EntityProviderService
  ) { 

    // setup menu item
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