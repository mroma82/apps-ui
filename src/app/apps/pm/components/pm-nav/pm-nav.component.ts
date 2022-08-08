import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@Component({
  selector: 'app-pm-nav',
  templateUrl: './pm-nav.component.html',
  styleUrls: ['./pm-nav.component.sass']
})
export class PmNavComponent implements OnInit {

  // observables
  navItems$: Observable<IMenuItem[]>;

  // new
  constructor(
    entityApi: EntityApiService
  ) {
    const home = "/app/preventative-maintenance";

    // helper
    const hasAccess = (entityTypeId) => entityApi.hasAccess(entityTypeId, SecurityPermissionMask.View)

    // set nav items
    this.navItems$ = of([
      { title: "Home", url: home, icon: "", description: "", hasAccess$: hasAccess(EntityTypes.PmItem), activePathIsExact: true },
      { title: "Items", url: `${home}/items`, icon: "", description: "", hasAccess$: hasAccess(EntityTypes.PmItem) },
      { title: "Activities", url: `${home}/activities`, icon: "", description: "", hasAccess$: hasAccess(EntityTypes.PmActivity) },
      { title: "Events", url: `${home}/events`, icon: "", description: "", hasAccess$: hasAccess(EntityTypes.PmEvent) },
      { title: "Agenda", url: `${home}/agenda`, icon: "", description: "", hasAccess$: hasAccess(EntityTypes.PmEvent) },
      { title: "Parameters", url: `${home}/parameters`, icon: "", description: "", hasAccess$: entityApi.hasAccess(EntityTypes.PmParameters, SecurityPermissionMask.Edit) }
    ]);
  }

  // init
  ngOnInit() {
  }
}
