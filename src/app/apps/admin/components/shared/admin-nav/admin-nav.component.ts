import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { AdminMenuItemsService } from '../../../services/admin-menu-items.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  // observables
  navItems$: Observable<IMenuItem[]>;

  // new
  constructor(
    private menuItemService: MenuItemService
  ) {
    this.navItems$ = this.menuItemService.adminMenuItems$.pipe(map(lst => {
      return [
        { title: "Admin", url: "/app/admin", icon: "", description: "", hasAccess$: of(true) },
        ...lst
      ]
    }));
  }

  // init
  ngOnInit() {
  }
}
