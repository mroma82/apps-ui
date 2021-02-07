import { Component, OnInit } from '@angular/core';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-pm-event-view-edit',
  templateUrl: './pm-event-view-edit.component.html',
  styleUrls: ['./pm-event-view-edit.component.sass']
})
export class PmEventViewEditComponent extends BaseEntityViewEditComponent {

  // new
  constructor(
    context: EntityViewEditContextService
  ) { 
    super(context);
  }
}
