import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-pm-item-create',
  templateUrl: './pm-item-create.component.html',
  styleUrls: ['./pm-item-create.component.sass']
})
export class PmItemCreateComponent extends BaseEntityCreateComponent {

  // new
  constructor(
    createContext : EntityCreateContextService
  ) {
    super(createContext);
  }
}
