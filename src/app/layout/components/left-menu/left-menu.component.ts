import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { APP_VERSION } from '../../../app-version';
import { IMenuItem } from '../../../common/models/menu-item';
import { MenuItemService } from '../../../common/services/menu-item.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  @ViewChild("container") container: ElementRef;

  // state
  state = {
    showMenu: false
  };

  // model
  model = {
    appVersion: APP_VERSION,
    environmentDescription: environment.description
  };

  // observables
  appMenuItems$: Observable<IMenuItem[]>;
  setupMenuItems$: Observable<IMenuItem[]>;

  // new  
  constructor(
    private menuItemService: MenuItemService
  ) {
    this.appMenuItems$ = this.menuItemService.appMenuItems$;
    this.setupMenuItems$ = this.menuItemService.setupMenuItems$;
  }

  ngOnInit(): void {
  }

  // toggle the menu
  toggleMenu() {
    this.state.showMenu = !this.state.showMenu;
  }

  // hide menu
  hideMenu() {
    this.state.showMenu = false;
  }

  // handle when container is clicked
  onContainerClick(e: Event) {

    // make sure it's onlyt he container
    if (e.target === this.container.nativeElement)
      this.hideMenu();
  }
}
