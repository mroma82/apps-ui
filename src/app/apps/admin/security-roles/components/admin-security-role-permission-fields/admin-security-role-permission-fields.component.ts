import { Component, Input, OnInit } from '@angular/core';
import { SecurityPermissionMask } from '../../../../../common/enums/security-permission-mask';

@Component({
  selector: 'app-admin-security-role-permission-fields',
  templateUrl: './admin-security-role-permission-fields.component.html',
  styleUrls: ['./admin-security-role-permission-fields.component.sass']
})
export class AdminSecurityRolePermissionFieldsComponent implements OnInit {
  @Input() model: any;

  // define permission model
  permissionModel = {};

  // new
  constructor() { }

  // init
  ngOnInit(): void {

    // load the permissions
    this.loadPermissionMask(this.model.permissionMask);
  }

  // set permission mask
  loadPermissionMask(permissionMask: number) {

    // helper to set
    var setMask = (mask: SecurityPermissionMask) => {
      this.permissionModel[mask] = (permissionMask & mask) === mask;
    }

    // set all
    setMask(SecurityPermissionMask.View);
    setMask(SecurityPermissionMask.Edit);
    setMask(SecurityPermissionMask.Add);
    setMask(SecurityPermissionMask.Delete);
    setMask(SecurityPermissionMask.WorkflowAdmin);
  }



  // update the permissions mask
  updatePermissionMask(model: any) {

    // init mask
    var permissionMask = 0;

    // helper
    var addMask = (mask: SecurityPermissionMask) => {
      if (model[mask])
        permissionMask = permissionMask | mask;
    }

    // chedck all
    addMask(SecurityPermissionMask.View);
    addMask(SecurityPermissionMask.Edit);
    addMask(SecurityPermissionMask.Add);
    addMask(SecurityPermissionMask.Delete);
    addMask(SecurityPermissionMask.WorkflowAdmin);

    // set the permission mask
    this.model.permissionmask = permissionMask;
  }
}
