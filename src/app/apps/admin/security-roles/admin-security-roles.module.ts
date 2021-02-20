import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { AdminSecurityRolesListConfigurationService } from './services/admin-security-roles-list-configuration.service';
import { AdminSecurityRolesValidationService } from './services/admin-security-roles-validation.service';
import { AdminSecurityRoleCreateComponent } from './components/admin-security-role-create/admin-security-role-create.component';
import { AdminSecurityRoleViewEditComponent } from './components/admin-security-role-view-edit/admin-security-role-view-edit.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppsCoreModule } from 'src/app/core/core.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { AdminSecurityRoleEntitySubGridComponent } from './components/admin-security-role-entity-sub-grid/admin-security-role-entity-sub-grid.component';
import { AdminSecurityRoleEntityCreateComponent } from './components/admin-security-role-entity-create/admin-security-role-entity-create.component';
import { AdminSecurityRoleEntityEditComponent } from './components/admin-security-role-entity-edit/admin-security-role-entity-edit.component';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AdminSecurityRolesEntityConfigurationService } from './services/admin-security-roles-entity-configuration.service';

@NgModule({
  declarations: [
    AdminSecurityRoleCreateComponent, 
    AdminSecurityRoleViewEditComponent, 
    AdminSecurityRoleEntitySubGridComponent, 
    AdminSecurityRoleEntityCreateComponent, 
    AdminSecurityRoleEntityEditComponent
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
    { provide: ENTITY_CONFIG, useClass: AdminSecurityRolesEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminSecurityRolesListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: AdminSecurityRolesValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminSecurityRoleCreateComponent,
    AdminSecurityRoleViewEditComponent,
    AdminSecurityRoleEntityCreateComponent,
    AdminSecurityRoleEntityEditComponent
  ]
})
export class AdminSecurityRolesModule { }
