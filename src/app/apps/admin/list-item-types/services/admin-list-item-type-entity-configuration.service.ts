import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/abstractions/base-entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminListItemTypeCreateComponent } from '../components/admin-list-item-type-create/admin-list-item-type-create.component';
import { AdminListItemTypeViewEditComponent } from '../components/admin-list-item-type-view-edit/admin-list-item-type-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminListItemTypeEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) {
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.ListItemType);

    // create
    this.createFormComponent = AdminListItemTypeCreateComponent;

    // view/edit
    this.viewEditFormComponent = AdminListItemTypeViewEditComponent;

    // options
    this.navigateToEditAfterCreate = true;
  }

  // record description
  recordDescription = (x) => x.description;
}
