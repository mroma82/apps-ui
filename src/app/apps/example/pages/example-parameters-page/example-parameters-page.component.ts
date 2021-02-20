import { Component, Inject, OnInit } from '@angular/core';
import { ENTITY_CONFIG, IEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';
import { ExampleParametersComponent } from '../../components/example-parameters/example-parameters.component';
import { ExampleParametersEntityConfigurationService } from '../../services/example-parameters-entity-configuration.service';
import { ExampleParametersValidationService } from '../../services/example-parameters-validation.service';

@Component({
  selector: 'app-example-parameters-page',
  templateUrl: './example-parameters-page.component.html',
  styleUrls: ['./example-parameters-page.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: ExampleParametersEntityConfigurationService },
    EntitySingleRecordViewEditContextService,
    { provide: ENTITY_VALIDATION, useClass: ExampleParametersValidationService }
  ]
})
export class ExampleParametersPageComponent implements OnInit {

  // new
  constructor(
    private context: EntitySingleRecordViewEditContextService
  ) {}

  // init
  ngOnInit() {
    this.context.refresh();
  }
}
