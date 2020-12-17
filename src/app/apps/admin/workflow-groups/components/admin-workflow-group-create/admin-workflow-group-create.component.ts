import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-workflow-group-create',
  templateUrl: './admin-workflow-group-create.component.html',
  styleUrls: ['./admin-workflow-group-create.component.scss']
})
export class AdminWorkflowGroupCreateComponent extends BaseEntityCreateComponent {

  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }
}
