import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSystemUserListConfigurationService } from './services/admin-system-user-list-configuration.service';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { EntityValidationService, ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { AdminSystemUserViewEditComponent } from './components/admin-system-user-view-edit/admin-system-user-view-edit.component';
import { AdminSystemUserCreateComponent } from './components/admin-system-user-create/admin-system-user-create.component';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AdminSystemUserEntityConfigurationService } from './services/admin-system-user-entity-configuration.service';

@NgModule({
  declarations: [
    AdminSystemUserViewEditComponent, 
    AdminSystemUserCreateComponent
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
    { provide: ENTITY_CONFIG, useClass: AdminSystemUserEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminSystemUserListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminSystemUserViewEditComponent, 
    AdminSystemUserCreateComponent
  ]
})
export class AdminSystemUsersModule {}
