import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-tiles',
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.scss']
})
export class HomeTilesComponent implements OnInit, OnDestroy {

  // define menu base
  allMenuItems = [
    { title: "Example App", routerLink: "/app/example", key: "ExampleUser", icon: "fas fa-shapes" },
    { title: "Purchase Requisition", routerLink: "/app/purchase-req", key: "ExampleUser" },
    { title: "Admin", routerLink: "/app/admin", key: "SysAdmin", icon: "fas fa-cogs" }
  ];

  // observables
  menuItems$ = new BehaviorSubject<any>([]);

  // subscriptions
  onProfileChange: Subscription;

  // new
  constructor(
    private appContext: AppContextService
  ) { 

    // profile change
    this.onProfileChange = this.appContext.User.profile$.subscribe(x => {
      this.buildMenu(x);
    });
  }

  // build menu
  buildMenu(profile: any) {

    // init
    let menuItems = [];
    let roles = profile.role;
    if(roles) {

      this.allMenuItems.forEach(x => {
        if( roles.indexOf(x.key) > -1) {
          menuItems.push(x);
        }
      });      
    }

    // set
    this.menuItems$.next(menuItems);
  };

  // init
  ngOnInit() {
  }

  // destroy
  ngOnDestroy() {
    // clean up
    this.onProfileChange.unsubscribe();
  }

}
