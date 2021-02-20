import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminWorkflowGroupCreateComponent } from '../components/admin-workflow-group-create/admin-workflow-group-create.component';
import { AdminWorkflowGroupViewEditComponent } from '../components/admin-workflow-group-view-edit/admin-workflow-group-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowGroupEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.WorkflowGroup);

    // create
    this.createFormComponent = AdminWorkflowGroupCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminWorkflowGroupViewEditComponent;
  }

  // record description
  recordDescription = (x) => x.groupId;
}
