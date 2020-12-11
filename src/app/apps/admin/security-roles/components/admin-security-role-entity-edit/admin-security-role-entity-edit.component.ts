import { Component, OnInit } from '@angular/core';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { BaseEntitySubGridViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-security-role-entity-edit',
  templateUrl: './admin-security-role-entity-edit.component.html',
  styleUrls: ['./admin-security-role-entity-edit.component.scss']
})
export class AdminSecurityRoleEntityEditComponent extends BaseEntitySubGridViewEditComponent {
  
  // new
  constructor(
    private viewEditContext: EntitySubGridViewEditContextService
  ) {
    super(viewEditContext);
  }

  // define permission model
  permissionModel = {    
  }

  // init
  ngOnInit() {

    // list on model change
    this.subs.add(
      this.viewEditContext.model$.subscribe(x => {
        
        // check the permissions
        var permissionMask : number = x.permissionMask;
        var setMask = (mask: SecurityPermissionMask) => {
          this.permissionModel[mask] = (permissionMask & mask) === mask;
        }
        
        // set all
        setMask(SecurityPermissionMask.View);
        setMask(SecurityPermissionMask.Edit);
        setMask(SecurityPermissionMask.Add);
        setMask(SecurityPermissionMask.Delete);
        setMask(SecurityPermissionMask.WorkflowAdmin);        
      })
    )
  }

  // update the permissions mask
  updatePermissionMask(model: any) {
    
    // init mask
    var permissionMask = 0;

    // helper
    var addMask = (mask: SecurityPermissionMask) => {
      if(model[mask]) 
        permissionMask = permissionMask | mask;
    }

    // chedck all
    addMask(SecurityPermissionMask.View);
    addMask(SecurityPermissionMask.Edit);
    addMask(SecurityPermissionMask.Add);
    addMask(SecurityPermissionMask.Delete);
    addMask(SecurityPermissionMask.WorkflowAdmin);

    console.log(permissionMask);
    this.model.permissionmask = permissionMask;      
  }
}
