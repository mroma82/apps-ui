import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmActivitySubGridComponent } from './components/pm-activity-sub-grid/pm-activity-sub-grid.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { PmActivityCreateComponent } from './components/pm-activity-create/pm-activity-create.component';
import { PmActivityViewEditComponent } from './components/pm-activity-view-edit/pm-activity-view-edit.component';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmActivityListingConfigurationService } from './services/pm-activity-listing-configuration.service';
import { PmActivityValidationService } from './services/pm-activity-validation.service';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { PmEventModule } from '../events/pm-event.module';



@NgModule({
  declarations: [
    PmActivitySubGridComponent,
    PmActivityCreateComponent,
    PmActivityViewEditComponent
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
    PmEventModule
  ],
  exports: [
    PmActivitySubGridComponent
  ],
  providers: [
    EntityConfigurationService,
    { provide: ENTITY_LISTING_CONFIG, useClass: PmActivityListingConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: PmActivityValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService
  ]  
})
export class PmActivityModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService
  ) {

    // entity
    entityConfig.entityTypeId = EntityTypes.PmActivity;
    entityConfig.rootUrl = "/app/preventative-maintenance/activities";
    entityConfig.name = "Preventative Maintenance Activity";
    entityConfig.pluralName = "Preventative Maintenance Activities";

    // record description
    entityConfig.recordDescription = (x) => x.description;

    // create
    entityConfig.createFormComponent = PmActivityCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = PmActivityViewEditComponent;
  }
}
