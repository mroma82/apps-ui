import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { MenuItemService } from 'src/app/common/services/menu-item.service';

@Component({
  selector: 'app-pm-nav',
  templateUrl: './pm-nav.component.html',
  styleUrls: ['./pm-nav.component.sass']
})
export class PmNavComponent implements OnInit {

  // observables
  navItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private menuItemService: MenuItemService
  ) {     
    const home = "/app/preventative-maintenance";

    // set nav items
    this.navItems$ = of([      
      { title: "Home", url: home, icon: "", description: "", hasAccess$: of(true) },
      { title: "Items", url: `${home}/items`, icon: "", description: "", hasAccess$: of(true) },
      { title: "Activities", url: `${home}/activities`, icon: "", description: "", hasAccess$: of(true) },
      { title: "Events", url: `${home}/events`, icon: "", description: "", hasAccess$: of(true) },
      { title: "Parameters", url: `${home}/parameters`, icon: "", description: "", hasAccess$: of(true) }
    ]);
  }  

  // init
  ngOnInit() {
  }
}
