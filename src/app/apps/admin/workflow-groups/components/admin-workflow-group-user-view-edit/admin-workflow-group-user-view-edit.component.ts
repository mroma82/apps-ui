import { Component, OnInit } from '@angular/core';
import { BaseEntitySubGridViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-admin-workflow-group-user-view-edit',
  templateUrl: './admin-workflow-group-user-view-edit.component.html',
  styleUrls: ['./admin-workflow-group-user-view-edit.component.scss']
})
export class AdminWorkflowGroupUserViewEditComponent extends BaseEntitySubGridViewEditComponent {

  // new
  constructor(
    context: EntitySubGridViewEditContextService
  ) { 
    super(context)
  }

  ngOnInit() {
  }

}
