import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContextService } from 'src/app/app-context.service';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { MenuItemService } from 'src/app/common/services/menu-item.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})
export class AdminHomePageComponent implements OnInit {

  // observables
  menuItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private menuItemService: MenuItemService,
    private appContext : AppContextService
  ) { 

    // profile change
    this.menuItems$ = this.menuItemService.adminMenuItems$;
    
    // set titles
    this.appContext.Layout.setApp("Administration");
    this.appContext.Layout.setTitle(null);
  }  
  
  ngOnInit() {
  }

}
