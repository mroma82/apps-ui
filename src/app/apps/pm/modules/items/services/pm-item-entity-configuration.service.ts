import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmItemCreateComponent } from '../components/pm-item-create/pm-item-create.component';
import { PmItemViewEditComponent } from '../components/pm-item-view-edit/pm-item-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PmItemEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.PmItem);
    
    // create
    this.createFormComponent = PmItemCreateComponent;

    // view/edit
    this.viewEditFormComponent = PmItemViewEditComponent;

    // options
    this.navigateToEditAfterCreate = true;
  }

  // record description
  recordDescription =  (x) => x.description;
}
