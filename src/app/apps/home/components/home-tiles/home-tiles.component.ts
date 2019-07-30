import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { IMenuItem } from 'src/app/common/models/menu-item';

@Component({
  selector: 'app-home-tiles',
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.scss']
})
export class HomeTilesComponent implements OnInit {
      
  // observables
  menuItems$ : Observable<IMenuItem[]>;

  // new
  constructor(
    private menuItemService: MenuItemService
  ) { 

    // profile change
    this.menuItems$ = this.menuItemService.menuItems$;    
  }  


  // init
  ngOnInit() {
  }
}
