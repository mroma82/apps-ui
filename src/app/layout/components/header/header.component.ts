import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { AppContextService } from 'src/app/app-context.service';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { APP_VERSION } from 'src/app/app-version';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // model
  model = {
    showMenu: false,
    appVersion: APP_VERSION,
    environmentDescription: environment.description
  };

  // observables
  appMenuItems$: Observable<IMenuItem[]>;
  setupMenuItems$: Observable<IMenuItem[]>;

  // new  
  constructor(
    private appContext: AppContextService,
    private menuItemService: MenuItemService
  ) {
    this.appMenuItems$ = this.menuItemService.appMenuItems$;
    this.setupMenuItems$ = this.menuItemService.setupMenuItems$;
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
