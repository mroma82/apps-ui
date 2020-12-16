import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-list-item-create',
  templateUrl: './admin-list-item-create.component.html',
  styleUrls: ['./admin-list-item-create.component.scss']
})
export class AdminListItemCreateComponent extends BaseEntityCreateComponent {

  // new
  constructor(context : EntityCreateContextService) {
    super(context);
  }
}
