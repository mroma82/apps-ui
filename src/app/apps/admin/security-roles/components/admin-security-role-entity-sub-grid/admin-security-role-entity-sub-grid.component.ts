import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { AdminSecurityRolesEntityValidationService } from '../../services/admin-security-roles-entity-validation.service';
import { AdminSecurityRoleEntityCreateComponent } from '../admin-security-role-entity-create/admin-security-role-entity-create.component';
import { AdminSecurityRoleEntityEditComponent } from '../admin-security-role-entity-edit/admin-security-role-entity-edit.component';

@Component({
  selector: 'app-admin-security-role-entity-sub-grid',
  templateUrl: './admin-security-role-entity-sub-grid.component.html',
  styleUrls: ['./admin-security-role-entity-sub-grid.component.scss',],
  providers: [
    { provide: ENTITY_VALIDATION, useClass: AdminSecurityRolesEntityValidationService }
  ]
})
export class AdminSecurityRoleEntitySubGridComponent implements OnInit {

  // state
  viewMode$ : Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$ : Observable<any> = this.context.entityRecord$;

  // sub grid config
  subGridConfig : IEntitySubGridConfigurationService = {    
    createFormComponent: AdminSecurityRoleEntityCreateComponent,    
    editFormComponent: AdminSecurityRoleEntityEditComponent
  };

  // columns
  subGridColumns = [ 
    {
      title: 'Entity Type', 
      displayFunc$: (x) => {
        return this.entityProvider.getEntityName(x.entityTypeId)
      }
    },
    
    { title: "View", displayFunc: (x) => this.hasMask(SecurityPermissionMask.View, x.permissionMask) },
    { title: "Edit", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Edit, x.permissionMask) },
    { title: "Add", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Add, x.permissionMask) },
    { title: "Delete", displayFunc: (x) => this.hasMask(SecurityPermissionMask.Delete, x.permissionMask) },
    { title: "Workflow Admin", displayFunc: (x) => this.hasMask(SecurityPermissionMask.WorkflowAdmin, x.permissionMask) },
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
    private context: EntityViewEditContextService,
    private entityProvider: EntityProviderService
  ) { }

  ngOnInit() {
  }

}
