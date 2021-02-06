import { Component, OnInit } from '@angular/core';
import { EntityCreateComponent } from 'src/app/core/components/entity/create/entity-create/entity-create.component';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-pm-event-create',
  templateUrl: './pm-event-create.component.html',
  styleUrls: ['./pm-event-create.component.sass']
})
export class PmEventCreateComponent extends BaseEntityCreateComponent {

  // constructor
  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }

}