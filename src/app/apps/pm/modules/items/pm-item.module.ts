import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmItemViewEditComponent } from './components/pm-item-view-edit/pm-item-view-edit.component';
import { PmItemCreateComponent } from './components/pm-item-create/pm-item-create.component';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmItemListingConfigurationService } from './services/pm-item-listing-configuration.service';
import { PmItemValidationService } from './services/pm-item-validation.service';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { PmActivityModule } from '../activities/pm-activity.module';

@NgModule({
  declarations: [
    PmItemViewEditComponent,
    PmItemCreateComponent    
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,    
    NgxDatatableModule,
    FormsModule,
    DatepickerModule,    
    EntityRouteModule.forOptions(null),
    PmActivityModule
  ],
  providers: [
    EntityConfigurationService,
    { provide: ENTITY_LISTING_CONFIG, useClass: PmItemListingConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: PmItemValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService
  ]
})
export class PmItemModule {

  // new
  constructor(
    entityConfig: EntityConfigurationService
  ) {

    // entity
    entityConfig.entityTypeId = EntityTypes.PmItem;
    entityConfig.rootUrl = "/app/preventative-maintenance/items";
    entityConfig.name = "Preventative Maintenance Item";
    entityConfig.pluralName = "Preventative Maintenance Item";

    // record description
    entityConfig.recordDescription = (x) => x.description;

    // create
    entityConfig.createFormComponent = PmItemCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = PmItemViewEditComponent;
  }
}
