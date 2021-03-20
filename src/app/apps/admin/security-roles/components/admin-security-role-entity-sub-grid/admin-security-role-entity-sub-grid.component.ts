import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { IEntitySubGridColumn } from 'src/app/core/models/entity/entity-subgrid-column';
import { BaseEntitySubGridComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-component';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { EntityValidationService, ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { AdminSecurityRoleEntityEntityConfigurationService } from '../../services/admin-security-roles-entity-entity-configuration.service';
import { AdminSecurityRoleEntityCreateComponent } from '../admin-security-role-entity-create/admin-security-role-entity-create.component';
import { AdminSecurityRoleEntityEditComponent } from '../admin-security-role-entity-edit/admin-security-role-entity-edit.component';

@Component({
  selector: 'app-admin-security-role-entity-sub-grid',
  templateUrl: './admin-security-role-entity-sub-grid.component.html',
  styleUrls: ['./admin-security-role-entity-sub-grid.component.scss',],
  providers: [
    { provide: ENTITY_CONFIG, useClass: AdminSecurityRoleEntityEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService }
  ]
})
export class AdminSecurityRoleEntitySubGridComponent extends BaseEntitySubGridComponent {
  
  // entity tyoe
  entityTypeId: string = EntityTypes.SecurityRoleEntity;
  
  // sub grid config
  subGridConfig : IEntitySubGridConfigurationService = {    
    createFormComponent: AdminSecurityRoleEntityCreateComponent,    
    editFormComponent: AdminSecurityRoleEntityEditComponent
  };

  // columns
  subGridColumns : IEntitySubGridColumn[] = [ 
    {
      model: "entityTypeId",
      displayFunc$: (x) => this.entityProvider.getEntityName(x.entityTypeId)
    },
    
    { title: "View", model: "permissionMask", displayFunc: (x) => this.hasMask(SecurityPermissionMask.View, x.permissionMask) },
    { title: "Edit", model: "permissionMask", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Edit, x.permissionMask) },
    { title: "Add", model: "permissionMask", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Add, x.permissionMask) },
    { title: "Delete", model: "permissionMask", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Delete, x.permissionMask) },
    { title: "Workflow Admin", model: "permissionMask", displayFunc: (x) => this.hasMask(SecurityPermissionMask.WorkflowAdmin, x.permissionMask) },
  ]

  // mask helper
  hasMask(mask : SecurityPermissionMask, value: number ) {

    // check if mask is on
    if((value & mask) === mask) 
      return "Yes";
    else
      return "";    
  }

  // bnew
  constructor(
    context: EntityViewEditContextService,
    private entityProvider: EntityProviderService
  ) { 
    super(context);
  }
}
