import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSystemUserListConfigurationService } from './services/admin-system-user-list-configuration.service';
import { AdminSystemUserValidationService } from './services/admin-system-user-validation.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityRouteBuilder } from 'src/app/core/services/entity/entity-route-builder';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { AdminSystemUserViewEditComponent } from './components/admin-system-user-view-edit/admin-system-user-view-edit.component';
import { AdminSystemUserCreateComponent } from './components/admin-system-user-create/admin-system-user-create.component';

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
    RouterModule.forChild(EntityRouteBuilder.build(null))
  ],
  providers: [
    EntityConfigurationService,
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminSystemUserListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: AdminSystemUserValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminSystemUserViewEditComponent, 
    AdminSystemUserCreateComponent
  ]
})
export class AdminSystemUsersModule { 
  
  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = "4ecc715d-8240-4498-8554-78099ca9f019";
    entityConfig.rootUrl = "/app/admin/system-users";
    entityConfig.name = "System User";
    entityConfig.pluralName = "System Users";
    
    // record description
    entityConfig.recordDescription = (x) => x.username;

    // create
    entityConfig.createFormComponent = AdminSystemUserCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = AdminSystemUserViewEditComponent;
  }
}
