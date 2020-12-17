import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWorkflowGroupCreateComponent } from './components/admin-workflow-group-create/admin-workflow-group-create.component';
import { AdminWorkflowGroupViewEditComponent } from './components/admin-workflow-group-view-edit/admin-workflow-group-view-edit.component';
import { AdminWorkflowGroupListConfigurationService } from './services/admin-workflow-group-list-configuration.service';
import { AdminWorkflowGroupValidationService } from './services/admin-workflow-group-validation.service';
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
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@NgModule({
  declarations: [
    AdminWorkflowGroupCreateComponent, 
    AdminWorkflowGroupViewEditComponent
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
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminWorkflowGroupListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: AdminWorkflowGroupValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminWorkflowGroupCreateComponent, 
    AdminWorkflowGroupViewEditComponent
  ]
})
export class AdminWorkflowGroupModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = EntityTypes.WorkflowGroup;
    entityConfig.rootUrl = "/app/admin/workflow-groups";
    entityConfig.name = "Workflow Group";
    entityConfig.pluralName = "Workflow Groups";
    
    // create
    entityConfig.createFormComponent = AdminWorkflowGroupCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = AdminWorkflowGroupViewEditComponent;
  }
}
