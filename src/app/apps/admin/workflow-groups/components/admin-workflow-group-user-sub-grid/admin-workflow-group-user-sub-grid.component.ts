import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import { IEntitySubGridColumn } from 'src/app/core/models/entity/entity-subgrid-column';
import { BaseEntitySubGridComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-component';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { EntityValidationService, ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { AdminWorkflowGroupUserEntityConfigurationService } from '../../services/admin-workflow-group-user-entity-configuration.service';
import { AdminWorkflowGroupUserCreateComponent } from '../admin-workflow-group-user-create/admin-workflow-group-user-create.component';
import { AdminWorkflowGroupUserViewEditComponent } from '../admin-workflow-group-user-view-edit/admin-workflow-group-user-view-edit.component';

@Component({
  selector: 'app-admin-workflow-group-user-sub-grid',
  templateUrl: './admin-workflow-group-user-sub-grid.component.html',
  styleUrls: ['./admin-workflow-group-user-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: AdminWorkflowGroupUserEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService }
  ]
})
export class AdminWorkflowGroupUserSubGridComponent extends BaseEntitySubGridComponent {
  
  // new
  constructor(
    context: EntityViewEditContextService
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
      model: "user.fullName"
    },
    {
      model: "isActive",
      displayFunc: (x) => x.isActive ? "Yes" : ""
    },
    {
      model: "isNotified",
      displayFunc: (x) => x.isNotified ? "Yes" : ""
    },
    {
      model: "isDelegate",
      displayFunc: (x) => x.isDelegate ? "Yes" : ""
    }
  ];
      
}
