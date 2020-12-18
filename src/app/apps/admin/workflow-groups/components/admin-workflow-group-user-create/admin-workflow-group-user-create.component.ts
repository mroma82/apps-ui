import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-workflow-group-user-create',
  templateUrl: './admin-workflow-group-user-create.component.html',
  styleUrls: ['./admin-workflow-group-user-create.component.scss']
})
export class AdminWorkflowGroupUserCreateComponent extends BaseEntityCreateComponent {

  // new
  constructor(
    context : EntityCreateContextService
  ) { 
    super(context);
  }

  ngOnInit() {
  }

}
