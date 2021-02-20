import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminSystemUserCreateComponent } from '../components/admin-system-user-create/admin-system-user-create.component';
import { AdminSystemUserViewEditComponent } from '../components/admin-system-user-view-edit/admin-system-user-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminSystemUserEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.SystemUser);

    // create
    this.createFormComponent = AdminSystemUserCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminSystemUserViewEditComponent;
  }

  // record description
  recordDescription = (x) => x.username;
}
