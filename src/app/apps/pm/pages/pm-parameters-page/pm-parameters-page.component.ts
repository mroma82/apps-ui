import { Component, OnInit } from '@angular/core';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';
import { PmParametersComponent } from '../../components/pm-parameters/pm-parameters.component';
import { PmParametersEntityConfigurationService } from '../../services/pm-parameters-entity-configuration.service';
import { PmParametersValidationService } from '../../services/pm-parameters-validation.service';

@Component({
  selector: 'app-pm-parameters-page',
  templateUrl: './pm-parameters-page.component.html',
  styleUrls: ['./pm-parameters-page.component.sass'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: PmParametersEntityConfigurationService },
    EntitySingleRecordViewEditContextService,
    { provide: ENTITY_VALIDATION, useClass: PmParametersValidationService }
  ]
})
export class PmParametersPageComponent implements OnInit {

  // new
  constructor(
    private context: EntitySingleRecordViewEditContextService
  ) {
  }

  // init
  ngOnInit() {
    this.context.refresh();
  }
}
