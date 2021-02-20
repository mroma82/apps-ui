import { Component, OnInit } from '@angular/core';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntitySubGridColumn } from 'src/app/core/models/entity/entity-subgrid-column';
import { BaseEntitySubGridComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-component';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { AdminListItemEntityConfigurationService } from '../../services/admin-list-item-entity-configuration.service';
import { AdminListItemValidationService } from '../../services/admin-list-item-validation.service';
import { AdminListItemCreateComponent } from '../admin-list-item-create/admin-list-item-create.component';
import { AdminListItemViewEditComponent } from '../admin-list-item-view-edit/admin-list-item-view-edit.component';

@Component({
  selector: 'app-admin-list-item-sub-grid',
  templateUrl: './admin-list-item-sub-grid.component.html',
  styleUrls: ['./admin-list-item-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: AdminListItemEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: AdminListItemValidationService }
  ]
})
export class AdminListItemSubGridComponent extends BaseEntitySubGridComponent {
  
  // entity type
  entityTypeId: string = EntityTypes.ListItem;

  // config
  subGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: AdminListItemCreateComponent,
    editFormComponent: AdminListItemViewEditComponent
  };

  // columns
  subGridColumns: IEntitySubGridColumn[] = [
    { title: "Value", model: "valueId" },
    { title: "Text", model: "text" },
    { title: "Sort", model: "sortOrder" }
  ];

  // new
  constructor(
    context: EntityViewEditContextService
  ) {
    super(context);
  }  
}
