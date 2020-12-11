import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuItemsService {

  // define menu items
  menuItems$ : Observable<any>;

  // new
  constructor() { 
    
    // set the items
    const baseUrl = "/app/admin";
    this.menuItems$ = of([
      { url: `${baseUrl}/list-items`, title: "Drop Down Lists", description: "Manage drop down list values" },
      { url: `${baseUrl}/security-roles`, title: "Roles", description: "Manage Security Roles for access features of the Applications" },
      { url: `${baseUrl}/system-users`, title: "Users", description: "Manage Users that have access to Applications" },
      { url: `${baseUrl}/permissions`, title: "Permissions", description: "Manage User permissions for access features of the Applications" },
      { url: `${baseUrl}/workflow-groups`, title: "Workflow Groups", description: "Manage Workflow Assignment groups" }
    ]);
  }
}
