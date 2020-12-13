import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AdminListItemTypeListConfigurationService } from './services/admin-list-item-type-list-configuration.service';
import { AdminListItemTypeValidationService } from './services/admin-list-item-type-validation.service';
import { AdminListItemTypeCreateComponent } from './components/admin-list-item-type-create/admin-list-item-type-create.component';
import { AdminListItemTypeViewEditComponent } from './components/admin-list-item-type-view-edit/admin-list-item-type-view-edit.component';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@NgModule({
  declarations: [
    AdminListItemTypeCreateComponent, 
    AdminListItemTypeViewEditComponent
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
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminListItemTypeListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: AdminListItemTypeValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminListItemTypeCreateComponent, 
    AdminListItemTypeViewEditComponent
  ]
})
export class AdminListItemTypeModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = EntityTypes.ListItemType;
    entityConfig.rootUrl = "/app/admin/list-items";
    entityConfig.name = "Drop Down List";
    entityConfig.pluralName = "Drop Down List";
    
    // create
    entityConfig.createFormComponent = AdminListItemTypeCreateComponent;

    // view/edit
    entityConfig.viewEditFormComponent = AdminListItemTypeViewEditComponent;
  }

}