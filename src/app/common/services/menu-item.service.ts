import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';
import { BehaviorSubject, Subscription, combineLatest, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

// foundation menu items
const foundationMenu : IMenuItem[] = [
  { title: "Example App", url: "/app/example", allowedRoles: [ "ExampleUser"], icon: "fas fa-shapes" },
  { title: "Admin", url: "/app/admin", allowedRoles: [ "SysAdmin"], icon: "fas fa-cogs" }
];

// app menu items
const appMenuItems: IMenuItem[] = [
  { title: "Purchase Requisition", url: "/app/purchase-req", allowedRoles: [ "ExampleUser" ], icon: "fas fa-shopping-cart" }
];

// full menu
const fullMenu = [
  ...appMenuItems,
  ...foundationMenu
];

@Injectable({
  providedIn: 'root'
})
export class MenuItemService implements OnDestroy {

  // observables
  menuItems$ = new BehaviorSubject<IMenuItem[]>([]);

  // subscriptions
  onProfileChange$ : Subscription;

  // new
  constructor(
    private userContext: UserContextService
  ) { 

    // setup subscription
    this.onProfileChange$ = combineLatest(
      userContext.profile$, 
      userContext.isAdmin$
    ).pipe(debounce(() => timer(100))).subscribe(([profile, isAdmin]) => {
      this.menuItems$.next(this.buildMenuItems(profile, isAdmin));
    });
  }

  // get menu items
  private buildMenuItems(profile: any, isAdmin: boolean) : IMenuItem[] {
    
    // build the menu
    let menuItems : IMenuItem[] = [];
    fullMenu.forEach(menuItem => {
      if(this.hasAccessToMenuItem(profile, isAdmin, menuItem))
        menuItems.push(menuItem);
    });

    // return 
    return menuItems;
  }

  // has access to menu item
  private hasAccessToMenuItem(profile: any, isAdmin: boolean, menuItem: IMenuItem) : boolean {                

    // check admin
    if(isAdmin)
      return true;  

    // get the roles, check if any roles to check
    let roles = profile.role;
    if(roles && menuItem.allowedRoles) {

      // go through each allowed role
      let hasAccess = false;
      menuItem.allowedRoles.forEach(role => {
        if( roles.indexOf(role) > -1)
          hasAccess = true;
      })

      // return
      return hasAccess;
    } 
    
    // no access
    return false;
  }
  
  // destroy
  ngOnDestroy() {

    // clean up
    this.onProfileChange$.unsubscribe();
  }
}