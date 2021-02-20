import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminSecurityRoleCreateComponent } from '../components/admin-security-role-create/admin-security-role-create.component';
import { AdminSecurityRoleViewEditComponent } from '../components/admin-security-role-view-edit/admin-security-role-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminSecurityRolesEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.SecurityRole);
    
    // create
    this.createFormComponent = AdminSecurityRoleCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminSecurityRoleViewEditComponent;
  }

  // record description
  recordDescription = (x) => x.name;
}
