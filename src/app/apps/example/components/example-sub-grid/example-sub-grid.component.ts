import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ENTITY_CONFIG } from '../../../../core/services/entity/entity-configuration.service';
import { EntityTypes } from '../../../../core/services/entity/entity-types';
import { EntityValidationService, ENTITY_VALIDATION } from '../../../../core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from '../../../../core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { ExampleEntityConfigurationService } from '../../services/example-entity-configuration.service';
import { ExampleCreateComponent } from '../example-create/example-create.component';
import { ExampleViewEditFormComponent } from '../example-view-edit-form/example-view-edit-form.component';

@Component({
  selector: 'app-example-sub-grid',
  templateUrl: './example-sub-grid.component.html',
  styleUrls: ['./example-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: ExampleEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService }
  ]
})
export class ExampleSubGridComponent implements OnInit {
  @Input() filter: any;

  // columns
  cols = [
    {
      model: "exampleId",
      isLink: true,
      showEditLink: true
    },
    {
      model: "title"
    },
    {
      model: "status",
      displayFunc: x => {
        switch (x.status) {
          case 0: return "Open";
          case 1: return "In Progress";
          case 2: return "Completed";
          default: return "Unknown";
        }
      }
    },
  ];

  // options
  entityTypeId: string = EntityTypes.Example;

  // sub grid config
  lineSubGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: ExampleCreateComponent,
    editFormComponent: ExampleViewEditFormComponent,
    navigateToEditAfterCreate: true,
    navigateToViewOnLink: true,
    viewLinkUrl: "/app/example/view"
  };

  // new
  constructor(
  ) { }

  ngOnInit() {
  }

}
