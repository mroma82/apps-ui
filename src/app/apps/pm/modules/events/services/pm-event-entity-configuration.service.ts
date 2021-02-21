import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmEventCreateComponent } from '../components/pm-event-create/pm-event-create.component';
import { PmEventViewEditComponent } from '../components/pm-event-view-edit/pm-event-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PmEventEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.PmEvent);
    
    // create
    this.createFormComponent = PmEventCreateComponent;

    // view/edit
    this.viewEditFormComponent = PmEventViewEditComponent;

    // options
    this.navigateToEditAfterCreate = true;
    this.showAddOnListing = false;
  }

  // record description
  recordDescription =  (x) => "DATE";
}
