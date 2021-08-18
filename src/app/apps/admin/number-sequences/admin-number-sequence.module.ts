import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap';
import { AppCommonModule } from '../../../common/app-common.module';
import { AppsCoreModule } from '../../../core/core.module';
import { EntityCreateContextService } from '../../../core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG } from '../../../core/services/entity/entity-configuration.service';
import { EntityRouteModule } from '../../../core/services/entity/entity-route.module';
import { EntitySecurityService } from '../../../core/services/entity/entity-security.service';
import { ENTITY_VALIDATION, EntityValidationService } from '../../../core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from '../../../core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from '../../../core/services/entity/listing/entity-listing-context.service';
import { AppFoundationModule } from '../../../foundation/app-foundation.module';
import { AdminNumberSequenceEntityConfigurationService } from './services/admin-number-sequence-entity-configuration.service';
import { AdminNumberSequenceListConfigurationService } from './services/admin-number-sequence-list-configuration.service';
import { AdminNumberSequenceCreateComponent } from './components/admin-number-sequence-create/admin-number-sequence-create.component';
import { AdminNumberSequenceViewEditComponent } from './components/admin-number-sequence-view-edit/admin-number-sequence-view-edit.component';
import { AdminNumberSequenceFormComponent } from './components/admin-number-sequence-form/admin-number-sequence-form.component';

@NgModule({
  declarations: [    
    AdminNumberSequenceCreateComponent,    
    AdminNumberSequenceViewEditComponent,    
    AdminNumberSequenceFormComponent
  ],
  imports: [
    CommonModule,    
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,    
    NgxDatatableModule,
    FormsModule,
    DatepickerModule,    
    EntityRouteModule.forOptions(null)
  ],
  providers: [
    { provide: ENTITY_CONFIG, useClass: AdminNumberSequenceEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminNumberSequenceListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    
  ]
})
export class AdminNumberSequenceModule { }
