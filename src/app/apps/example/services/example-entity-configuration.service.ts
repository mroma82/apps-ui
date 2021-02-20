import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ExampleCreateComponent } from '../components/example-create/example-create.component';
import { ExampleViewEditFormComponent } from '../components/example-view-edit-form/example-view-edit-form.component';

@Injectable({
  providedIn: 'root'
})
export class ExampleEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.Example);

    
    // workflow
    this.workflow.enabled = true;
    this.workflow.url = "/example/workflow";
    this.workflow.prefixText = "Approval Workflow";   
    
    // create
    this.createFormComponent = ExampleCreateComponent;

    // view/edit
    this.viewEditFormComponent = ExampleViewEditFormComponent;

    // options
    this.navigateToEditAfterCreate = true;
  }

  // record description
  recordDescription =  (x) => x.exampleId;
}
