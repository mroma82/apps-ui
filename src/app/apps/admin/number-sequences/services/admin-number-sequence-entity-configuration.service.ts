import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminNumberSequenceCreateComponent } from '../components/admin-number-sequence-create/admin-number-sequence-create.component';
import { AdminNumberSequenceViewEditComponent } from '../components/admin-number-sequence-view-edit/admin-number-sequence-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminNumberSequenceEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.NumberSequence);

    // create
    this.createFormComponent = AdminNumberSequenceCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminNumberSequenceViewEditComponent;
  }

  // record description
  recordDescription = (x) => x.text;
}
