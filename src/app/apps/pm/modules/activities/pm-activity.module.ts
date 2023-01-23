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
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { PmActivityListingConfigurationService } from './services/pm-activity-listing-configuration.service';
import { PmActivityValidationService } from './services/pm-activity-validation.service';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { PmEventModule } from '../events/pm-event.module';
import { PmActivityEntityConfigurationService } from './services/pm-activity-entity-configuration.service';
import { PmActivityViewEditFormComponent } from './components/pm-activity-view-edit-form/pm-activity-view-edit-form.component';
import { PmActivityViewEditSubgridComponent } from './components/pm-activity-view-edit-subgrid/pm-activity-view-edit-subgrid.component';



@NgModule({
  declarations: [
    PmActivitySubGridComponent,
    PmActivityCreateComponent,
    PmActivityViewEditComponent,
    PmActivityViewEditFormComponent,
    PmActivityViewEditSubgridComponent
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
    PmActivitySubGridComponent,
    PmActivityViewEditComponent,
    PmActivityViewEditFormComponent,
    PmActivityViewEditSubgridComponent
  ],
  providers: [
    { provide: ENTITY_CONFIG, useClass: PmActivityEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: PmActivityListingConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: PmActivityValidationService },
    EntityListingContextService,
    EntityCreateContextService,
    EntitySecurityService
  ]
})
export class PmActivityModule { }
