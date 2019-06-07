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
export class HomeTilesComponent implements OnInit, OnDestroy {
      
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

  // destroy
  ngOnDestroy() {

    // clean up
    this.onProfileChange.unsubscribe();
  }

}
