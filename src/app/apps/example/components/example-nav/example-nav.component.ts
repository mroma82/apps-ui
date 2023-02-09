import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppContextService } from 'src/app/app-context.service';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { INavigationItem } from 'src/app/common/models/navigation-item';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@Component({
  selector: 'app-example-nav',
  templateUrl: './example-nav.component.html',
  styleUrls: ['./example-nav.component.scss']
})
export class ExampleNavComponent implements OnInit {

  // state
  navItems$: Observable<INavigationItem[]>;

  // new
  constructor(
    appContext: AppContextService,
    entityApi: EntityApiService
  ) {

    // setup nav items
    const baseUrl = "/app/example";
    this.navItems$ = of([
      { url: `${baseUrl}/dashboard`, title: "Home", activePathIsExact: true },
      { url: `${baseUrl}/list`, title: "Examples" },
      { url: `${baseUrl}/mytasks`, title: "My Tasks" },
      { url: `${baseUrl}/parameters`, title: "Parameters", hasAccess$: entityApi.hasAccess(EntityTypes.ExampleParameters, SecurityPermissionMask.Edit) },
    ]);
  }

  // init
  ngOnInit() {
  }
}
