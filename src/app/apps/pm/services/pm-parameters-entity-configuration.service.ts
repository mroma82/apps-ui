import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmParametersComponent } from '../components/pm-parameters/pm-parameters.component';

@Injectable({
  providedIn: 'root'
})
export class PmParametersEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.PmParameters);
    
    // view/edit
    this.viewEditFormComponent = PmParametersComponent;
  }
}
