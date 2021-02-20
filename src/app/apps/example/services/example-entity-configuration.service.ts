import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable, of } from 'rxjs';
import { UtcDateTimePipe } from 'src/app/common/pipes/utc-date-time.pipe';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
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
