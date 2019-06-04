import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { AppContextService } from 'src/app/app-context.service';
import { MenuItemService } from 'src/app/common/services/menu-item.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  model = {
    showMenu: false
  };

  // observables
  menuItems$ = new BehaviorSubject<IMenuItem[]>([]);

  // subscriptions
  onProfileChange: Subscription;

  // new  
  constructor(
    private appContext: AppContextService,
    private menuItemService: MenuItemService
  ) { 

    // profile change
    this.onProfileChange = this.appContext.User.profile$.subscribe(x => {
      this.menuItems$.next(this.menuItemService.getMenuItems());
    });
  }  

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy() {
    this.onProfileChange.unsubscribe();
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
