import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminMenuItemsService } from '../../../services/admin-menu-items.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  // observables
  navItems$ : Observable<any> = this.menuItems.menuItems$;
  
  // new
  constructor(
    private menuItems : AdminMenuItemsService
  ) {     
    // set menu items
    this.navItems$ = this.menuItems.menuItems$.pipe(map((x : any[]) => {
      return [
        { title: "Home", url: "/app/admin" },
        ...x
      ];
    }))
  }

  // init
  ngOnInit() {
  }
}
