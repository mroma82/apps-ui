import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-system-user-create',
  templateUrl: './admin-system-user-create.component.html',
  styleUrls: ['./admin-system-user-create.component.scss']
})
export class AdminSystemUserCreateComponent extends BaseEntityCreateComponent {
  
  // new
  constructor(
    createContext : EntityCreateContextService
  ) {
    super(createContext);
  }
}
