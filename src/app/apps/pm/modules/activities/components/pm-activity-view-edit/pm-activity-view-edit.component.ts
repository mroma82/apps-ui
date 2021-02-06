import { Component, OnInit } from '@angular/core';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-pm-activity-view-edit',
  templateUrl: './pm-activity-view-edit.component.html',
  styleUrls: ['./pm-activity-view-edit.component.sass']
})
export class PmActivityViewEditComponent extends BaseEntityViewEditComponent {

  // new
  constructor(
    context : EntityViewEditContextService
  ) {
    super(context);
  }

}
