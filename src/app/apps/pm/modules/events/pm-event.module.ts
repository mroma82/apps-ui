import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmEventViewEditComponent } from './components/pm-event-view-edit/pm-event-view-edit.component';
import { PmEventCreateComponent } from './components/pm-event-create/pm-event-create.component';
import { PmEventSubGridComponent } from './components/pm-event-sub-grid/pm-event-sub-grid.component';
import { PmEventListingConfigurationService } from './services/pm-event-listing-configuration.service';
import { PmEventValidationService } from './services/pm-event-validation.service';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { PmEventFormComponent } from './components/pm-event-form/pm-event-form.component';
import { PmEventSubGridViewEditComponent } from './components/pm-event-sub-grid-view-edit/pm-event-sub-grid-view-edit.component';
import { PmEventEntityConfigurationService } from './services/pm-event-entity-configuration.service';
import { PmEventCompleteComponent } from './components/pm-event-complete/pm-event-complete.component';
import { PmEventCompleteModalComponent } from './modals/pm-event-complete-modal/pm-event-complete-modal.component';
import { PmEventCompleteContextService } from './services/pm-event-complete-context.service';



@NgModule({
  declarations: [
    PmEventViewEditComponent,
    PmEventCreateComponent,
    PmEventSubGridComponent,
    PmEventFormComponent,
    PmEventSubGridViewEditComponent,
    PmEventCompleteComponent,
    PmEventCompleteModalComponent
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
  ],
  exports: [
    PmEventSubGridComponent,
    PmEventCompleteComponent,
    PmEventCompleteModalComponent
  ],
  providers: [
    { provide: ENTITY_CONFIG, useClass: PmEventEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: PmEventListingConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: PmEventValidationService },
    EntityListingContextService,
    EntityCreateContextService,
    EntitySecurityService
  ]
})
export class PmEventModule { }
