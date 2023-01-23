import { Component, Input, OnInit } from '@angular/core';
import { BaseEntitySubGridViewEditComponent } from '../../../../../../core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridViewEditContextService } from '../../../../../../core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-pm-activity-view-edit-subgrid',
  templateUrl: './pm-activity-view-edit-subgrid.component.html',
  styleUrls: ['./pm-activity-view-edit-subgrid.component.scss']
})
export class PmActivityViewEditSubgridComponent extends BaseEntitySubGridViewEditComponent {

  // new
  constructor(context: EntitySubGridViewEditContextService) {
    super(context);
  }
}