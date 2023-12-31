import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWorkflowGroupCreateComponent } from './components/admin-workflow-group-create/admin-workflow-group-create.component';
import { AdminWorkflowGroupViewEditComponent } from './components/admin-workflow-group-view-edit/admin-workflow-group-view-edit.component';
import { AdminWorkflowGroupListConfigurationService } from './services/admin-workflow-group-list-configuration.service';
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
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminWorkflowGroupUserSubGridComponent } from './components/admin-workflow-group-user-sub-grid/admin-workflow-group-user-sub-grid.component';
import { AdminWorkflowGroupUserCreateComponent } from './components/admin-workflow-group-user-create/admin-workflow-group-user-create.component';
import { AdminWorkflowGroupUserViewEditComponent } from './components/admin-workflow-group-user-view-edit/admin-workflow-group-user-view-edit.component';
import { AdminWorkflowGroupUserFormComponent } from './components/admin-workflow-group-user-form/admin-workflow-group-user-form.component';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AdminWorkflowGroupEntityConfigurationService } from './services/admin-workflow-group-entity-configuration.service';

@NgModule({
  declarations: [
    AdminWorkflowGroupCreateComponent, 
    AdminWorkflowGroupViewEditComponent, 
    AdminWorkflowGroupUserSubGridComponent, 
    AdminWorkflowGroupUserCreateComponent, 
    AdminWorkflowGroupUserViewEditComponent, 
    AdminWorkflowGroupUserFormComponent
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
    { provide: ENTITY_CONFIG, useClass: AdminWorkflowGroupEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminWorkflowGroupListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminWorkflowGroupCreateComponent, 
    AdminWorkflowGroupViewEditComponent,
    AdminWorkflowGroupUserCreateComponent, 
    AdminWorkflowGroupUserViewEditComponent
  ]
})
export class AdminWorkflowGroupModule { }
