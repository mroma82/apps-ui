import { Injectable } from '@angular/core';
import { BaseEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminListItemTypeCreateComponent } from '../components/admin-list-item-type-create/admin-list-item-type-create.component';
import { AdminListItemTypeViewEditComponent } from '../components/admin-list-item-type-view-edit/admin-list-item-type-view-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AdminListItemEntityConfigurationService extends BaseEntityConfigurationService {

  // new
  constructor(
    provider: EntityProviderService
  ) { 
    super(provider);

    // set entity type
    this.setEntityType(EntityTypes.ListItem);
  }

  // record description
  recordDescription = (x) => x.text;
}
