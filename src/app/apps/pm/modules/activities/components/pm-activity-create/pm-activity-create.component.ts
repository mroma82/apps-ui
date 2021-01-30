import { Component, OnInit } from '@angular/core';
import { EntityCreateComponent } from 'src/app/core/components/entity/create/entity-create/entity-create.component';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';

@Component({
  selector: 'app-pm-activity-create',
  templateUrl: './pm-activity-create.component.html',
  styleUrls: ['./pm-activity-create.component.sass']
})
export class PmActivityCreateComponent extends BaseEntityCreateComponent {

  // constructor
  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }
  

}
