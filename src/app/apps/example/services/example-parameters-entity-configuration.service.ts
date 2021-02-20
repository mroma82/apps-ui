import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ExampleParametersComponent } from '../components/example-parameters/example-parameters.component';

@Injectable({
  providedIn: 'root'
})
export class ExampleParametersEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.ExampleParameters);

    // forms
    this.viewEditFormComponent = ExampleParametersComponent;
  }
}
