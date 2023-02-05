import { Component, OnInit } from '@angular/core';
import { IEntityColumnDefinition } from '../../../../core/models/entity/entity-column-definition';
import { IEntityListingColumn } from '../../../../core/models/entity/entity-listing-column';
import { ENTITY_CONFIG } from '../../../../core/services/entity/entity-configuration.service';
import { EntityTypes } from '../../../../core/services/entity/entity-types';
import { ExampleEntityConfigurationService } from '../../services/example-entity-configuration.service';

@Component({
  selector: 'app-example-dashboard-page',
  templateUrl: './example-dashboard-page.component.html',
  styleUrls: ['./example-dashboard-page.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: ExampleEntityConfigurationService }
  ]
})
export class ExampleDashboardPageComponent implements OnInit {

  // inner lists
  exampleEntityTypeId: string = EntityTypes.Example;
  exampleInnerListCols: IEntityListingColumn[] = [
    {
      model: "exampleId", isLink: true
    },
    {
      model: "title"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
