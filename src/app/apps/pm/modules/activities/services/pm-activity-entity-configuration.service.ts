import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmActivityCreateComponent } from '../components/pm-activity-create/pm-activity-create.component';
import { PmActivityViewEditComponent } from '../components/pm-activity-view-edit/pm-activity-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PmActivityEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.PmActivity);
    
    // create
    this.createFormComponent = PmActivityCreateComponent;

    // view/edit
    this.viewEditFormComponent = PmActivityViewEditComponent;

    // options
    this.navigateToEditAfterCreate = true;
    this.showAddOnListing = false;
  }

  // record description
  recordDescription =  (x) => x.description;
}
