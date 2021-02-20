import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminSecurityRoleEntityCreateComponent } from '../components/admin-security-role-entity-create/admin-security-role-entity-create.component';
import { AdminSecurityRoleEntityEditComponent } from '../components/admin-security-role-entity-edit/admin-security-role-entity-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminSecurityRoleEntityEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.SecurityRoleEntity);
    
    // create
    this.createFormComponent = AdminSecurityRoleEntityCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminSecurityRoleEntityEditComponent;
  }

  // record description
  recordDescription = (x) => x.name;
}
