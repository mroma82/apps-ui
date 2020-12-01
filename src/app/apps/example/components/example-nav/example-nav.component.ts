import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppContextService } from 'src/app/app-context.service';
import { INavigationItem } from 'src/app/common/models/navigation-item';

@Component({
  selector: 'app-example-nav',
  templateUrl: './example-nav.component.html',
  styleUrls: ['./example-nav.component.scss']
})
export class ExampleNavComponent implements OnInit {

  // state
  navItems$ : Observable<INavigationItem[]>;

  // new
  constructor(
    appContext: AppContextService
  ) { 

    // setup nav items
    const baseUrl = "/app/example";
    this.navItems$ = of([
      { url: `${baseUrl}`, title: "Home" },
      { url: `${baseUrl}/mytasks`, title: "Tasks" },
      { url: `${baseUrl}/parameters`, title: "Parameters", hasAccess$: appContext.User.hasAccess("ExampleAdmin") },
    ]);
  }

  // init
  ngOnInit() {
  }
}
