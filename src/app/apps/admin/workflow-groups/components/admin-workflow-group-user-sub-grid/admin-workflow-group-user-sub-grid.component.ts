import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntitySubGridColumn } from 'src/app/core/models/entity/entity-subgrid-column';
import { BaseEntitySubGridComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-component';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { AdminWorkflowGroupUserValidationService } from '../../services/admin-workflow-group-user-validation.service';
import { AdminWorkflowGroupUserCreateComponent } from '../admin-workflow-group-user-create/admin-workflow-group-user-create.component';
import { AdminWorkflowGroupUserViewEditComponent } from '../admin-workflow-group-user-view-edit/admin-workflow-group-user-view-edit.component';

@Component({
  selector: 'app-admin-workflow-group-user-sub-grid',
  templateUrl: './admin-workflow-group-user-sub-grid.component.html',
  styleUrls: ['./admin-workflow-group-user-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_VALIDATION, useClass: AdminWorkflowGroupUserValidationService }
  ]
})
export class AdminWorkflowGroupUserSubGridComponent extends BaseEntitySubGridComponent {
  
  // new
  constructor(
    context: EntityViewEditContextService,
    private auth: AuthService
  ) {
    super(context)
  }
  
  // entity
  entityTypeId: string = EntityTypes.WorkflowGroupUser;

  // config
  subGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: AdminWorkflowGroupUserCreateComponent,
    editFormComponent: AdminWorkflowGroupUserViewEditComponent
  };

  // columns
  subGridColumns: IEntitySubGridColumn[] = [
    { 
      title: "User", 
      model: "systemUserId",
      displayFunc$: (x) => of(x.systemUserId) // this.auth.getUserFullName(x.systemUserId).pipe(shareReplay(), map(y => y.fullName))
    },
    {
      title: "Active",
      model: "isActive",
      displayFunc: (x) => x.isActive ? "Yes" : ""
    },
    {
      title: "Notified",
      model: "isNotified",
      displayFunc: (x) => x.isNotified ? "Yes" : ""
    }
    ,
    {
      title: "Delegate",
      model: "isDelegate",
      displayFunc: (x) => x.isDelegate ? "Yes" : ""
    }
  ];
      
}
