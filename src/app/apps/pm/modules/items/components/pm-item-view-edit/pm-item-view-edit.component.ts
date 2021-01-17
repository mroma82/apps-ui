import { Component, OnInit } from '@angular/core';
import { PmListsService } from 'src/app/apps/pm/services/pm-lists.service';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-pm-item-view-edit',
  templateUrl: './pm-item-view-edit.component.html',
  styleUrls: ['./pm-item-view-edit.component.sass']
})
export class PmItemViewEditComponent extends BaseEntityViewEditComponent {

  // lists
  itemTypeList$ = this.lists.itemTypeList$;
  locationList$ = this.lists.locationList$;
  
  // new
  constructor(
    context: EntityViewEditContextService,
    private lists : PmListsService
  ) { 
    super(context);
  }
}
