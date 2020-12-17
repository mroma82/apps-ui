import { Component, OnInit } from '@angular/core';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-workflow-group-view-edit',
  templateUrl: './admin-workflow-group-view-edit.component.html',
  styleUrls: ['./admin-workflow-group-view-edit.component.scss']
})
export class AdminWorkflowGroupViewEditComponent extends BaseEntityViewEditComponent {

  constructor(
    context : EntityViewEditContextService
  ) {
    super(context);
  }
}
