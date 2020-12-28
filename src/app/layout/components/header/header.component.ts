import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { AppContextService } from 'src/app/app-context.service';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { APP_VERSION } from 'src/app/app-version';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // model
  model = {
    showMenu: false,
    appVersion: APP_VERSION
  };

  // observables
  menuItems$ : Observable<IMenuItem[]>;

  // new  
  constructor(
    private appContext: AppContextService,
    private menuItemService: MenuItemService
  ) {             
    this.menuItems$ = this.menuItemService.menuItems$;    
  }  

  // init
  ngOnInit() {
  }

  // toggle the menu
  toggleMenu() {
    this.model.showMenu = !this.model.showMenu;
  } 

  // hide menu
  hideMenu() {
    this.model.showMenu = false;
  }

}
