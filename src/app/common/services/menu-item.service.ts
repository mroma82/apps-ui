import { Injectable } from '@angular/core';
import { IMenuItem } from '../models/menu-item';
import { UserContextService } from './user-context.service';

// foundation menu items
const foundationMenu : IMenuItem[] = [
  { title: "Example App", url: "/app/example", allowedRoles: [ "ExampleUser"], icon: "fas fa-shapes" },
  { title: "Admin", url: "/app/admin", allowedRoles: [ "SysAdmin"], icon: "fas fa-cogs" }
];

// app menu items
const appMenuItems: IMenuItem[] = [
];

// full menu
const fullMenu = [
  ...appMenuItems,
  ...foundationMenu
];

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  // new
  constructor(
    private userContext: UserContextService
  ) { }

  // get menu items
  getMenuItems() : IMenuItem[] {
    
    // build the menu
    let menuItems : IMenuItem[] = [];
    fullMenu.forEach(x => {
      if(this.hasAccessToMenuItem(x))
        menuItems.push(x);
    });

    // return 
    return menuItems;
  }

  // has access to menu item
  hasAccessToMenuItem(menuItem: IMenuItem) : boolean {        
    const profile = this.userContext.profile$.value;
    const isAdmin = this.userContext.isAdmin$.value;

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
}