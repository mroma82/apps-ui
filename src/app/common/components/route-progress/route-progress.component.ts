import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-route-progress',
  templateUrl: './route-progress.component.html',
  styleUrls: ['./route-progress.component.scss']
})
export class RouteProgressComponent implements OnInit {
  show: boolean = true;

  constructor(router:Router) {
    router.events.subscribe(e => {
      
      switch (true) {
        case e instanceof NavigationStart: {
          this.show = true;
          break;
        }

        case e instanceof NavigationEnd:
        case e instanceof NavigationCancel:
        case e instanceof NavigationError: {
          this.show = false;
          break;
        }

        default: {
          break;
        }
      }
    });
  }
  
  ngOnInit(): void {
  }
}
