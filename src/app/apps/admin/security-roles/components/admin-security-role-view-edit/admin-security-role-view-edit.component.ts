import { Component } from '@angular/core';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';


@Component({
  selector: 'app-admin-security-role-view-edit',
  templateUrl: './admin-security-role-view-edit.component.html',
  styleUrls: ['./admin-security-role-view-edit.component.scss']
})
export class AdminSecurityRoleViewEditComponent extends BaseEntityViewEditComponent {

  // new
  constructor(
    context: EntityViewEditContextService
  ) {
    super(context);
  }
}
