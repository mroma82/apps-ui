import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
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
import { RouterModule } from '@angular/router';
import { EntityRouteBuilder } from 'src/app/core/services/entity/entity-route-builder';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

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
    RouterModule.forChild(EntityRouteBuilder.build(null))
  ],
  providers: [
    EntityConfigurationService,
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
export class AdminSecurityRolesModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = EntityTypes.SecurityRole;
    entityConfig.rootUrl = "/app/admin/security-roles";
    entityConfig.name = "Security Role";
    entityConfig.pluralName = "Security Roles";
    
    // create
    entityConfig.createFormComponent = AdminSecurityRoleCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = AdminSecurityRoleViewEditComponent;
  }
}
