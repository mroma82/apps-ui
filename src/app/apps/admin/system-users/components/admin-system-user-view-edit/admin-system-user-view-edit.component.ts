import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-system-user-view-edit',
  templateUrl: './admin-system-user-view-edit.component.html',
  styleUrls: ['./admin-system-user-view-edit.component.scss']
})
export class AdminSystemUserViewEditComponent extends BaseEntityViewEditComponent {
  
  // lists
  roles$ : Observable<any>;

  // define roles
  userRoles = {};

  // new
  constructor(
    viewEditContext : EntityViewEditContextService,
    private entityApi : EntityApiService
  ) {
    // base
    super(viewEditContext);
    
    // get the roles
    this.roles$ = entityApi.list("2d5c70e5-82a9-400e-8528-a10adf0972ba", {}).pipe(map(x => x.items));
  }

  // override model change
  onModelChange(model: any) {
    super.onModelChange(model);

    // set the roles
    this.entityApi.list("a3c8f835-496e-4caf-8238-6d3b566df4d6", { filter: { systemUserId: model.id }}).subscribe(x => {      
      
      // build the user/roles
      this.userRoles = {};
      this.model.roles = [];
      x.items.forEach(userRole => {
        this.userRoles[userRole.securityRoleId] = true;
        this.model.roles.push(userRole.securityRoleId);
      });
    })
  }

  // set tolr
  setRole(roleId: string) {

    // add/remove from list
    if(this.userRoles[roleId]) {
      this.model.roles.push(roleId);
    } else {
      this.model.roles.splice(this.model.roles.indexOf(roleId), 1);
    }    
  }
}
