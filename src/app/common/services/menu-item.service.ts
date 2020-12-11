import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';
import { debounce, map, mergeMap } from 'rxjs/operators';
import { SecurityService } from './security.service';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService implements OnDestroy {

  // foundation menu
  readonly foundationMenu : IMenuItem[] = [
    { 
      title: "Example App", description: "Demo application to display core functionality",
      url: "/app/example", icon: "fas fa-shapes", 
      hasAccess$: this.securityService.hasEntityView("e1d39dfa-2940-4434-a7e4-2c85d2d2fe47") 
    },
    { 
      title: "Admin", description: "Manage users and global settings",
      url: "/app/admin", icon: "fas fa-cogs", 
      hasAccess$: this.userContext.isAdmin$
    }
  ];


  // app menu items
  readonly appMenuItems: IMenuItem[] = [
  ];

  // bull menu
  readonly fullMenu = [
    ...this.appMenuItems,
    ...this.foundationMenu
  ];


  // observables
  menuItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private userContext: UserContextService,
    private securityService: SecurityService
  ) { 

    // setup menu item
    this.menuItems$ = userContext.profile$.pipe(debounce(() => timer(100)), map(x => this.fullMenu));    
  }    

  // cleanup
  ngOnDestroy() {

  }
}