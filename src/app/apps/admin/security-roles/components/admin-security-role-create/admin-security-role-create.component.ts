import { Component } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-security-role-create',
  templateUrl: './admin-security-role-create.component.html',
  styleUrls: ['./admin-security-role-create.component.scss']
})
export class AdminSecurityRoleCreateComponent extends BaseEntityCreateComponent {

  // new
  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }
}
