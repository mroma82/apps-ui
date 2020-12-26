import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    private menuItemService: MenuItemService
  ) { 

    // profile change
    this.menuItems$ = this.menuItemService.adminMenuItems$;    
  }  
  
  ngOnInit() {
  }

}
