import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppContextService } from 'src/app/app-context.service';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { INavigationItem } from 'src/app/common/models/navigation-item';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { ExampleEntityTypes } from '../../example-entity-types';

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
    appContext: AppContextService,
    entityApi: EntityApiService
  ) { 

    // setup nav items
    const baseUrl = "/app/example";
    this.navItems$ = of([
      { url: `${baseUrl}`, title: "Home" },
      { url: `${baseUrl}/mytasks`, title: "Tasks" },
      { url: `${baseUrl}/parameters`, title: "Parameters", hasAccess$: entityApi.hasAccess(ExampleEntityTypes.ExampleParameters, SecurityPermissionMask.Edit) },
    ]);
  }

  // init
  ngOnInit() {
  }
}
