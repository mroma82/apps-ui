import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminMenuItemsService } from '../../services/admin-menu-items.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})
export class AdminHomePageComponent implements OnInit {

  // menu items
  menuItems$ : Observable<any> = this.menuItems.menuItems$;

  // new
  constructor(
    private menuItems : AdminMenuItemsService
  ) { }

  ngOnInit() {
  }

}
