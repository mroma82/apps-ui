import { Component, OnInit } from '@angular/core';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';
import { ExampleParametersComponent } from '../../components/example-parameters/example-parameters.component';
import { ExampleParametersValidationService } from '../../services/example-parameters-validation.service';

@Component({
  selector: 'app-example-parameters-page',
  templateUrl: './example-parameters-page.component.html',
  styleUrls: ['./example-parameters-page.component.scss'],
  providers: [
    EntityConfigurationService,
    EntitySingleRecordViewEditContextService,
    { provide: 'IEntityValidationService', useClass: ExampleParametersValidationService }
  ]
})
export class ExampleParametersPageComponent implements OnInit {

  // new
  constructor(
    entityConfig: EntityConfigurationService,
    private context: EntitySingleRecordViewEditContextService
  ) { 

    // entity settings
    entityConfig.entityTypeId = "d6b351f0-618e-47cc-8eea-35cf3534d1fa";
    entityConfig.viewEditFormComponent = ExampleParametersComponent
  }

  // init
  ngOnInit() {
    this.context.refresh();
  }
}
