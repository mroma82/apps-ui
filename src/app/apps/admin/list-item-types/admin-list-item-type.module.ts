import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { AdminListItemTypeListConfigurationService } from './services/admin-list-item-type-list-configuration.service';
import { AdminListItemTypeCreateComponent } from './components/admin-list-item-type-create/admin-list-item-type-create.component';
import { AdminListItemTypeViewEditComponent } from './components/admin-list-item-type-view-edit/admin-list-item-type-view-edit.component';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { AdminListItemViewEditComponent } from './components/admin-list-item-view-edit/admin-list-item-view-edit.component';
import { AdminListItemCreateComponent } from './components/admin-list-item-create/admin-list-item-create.component';
import { AdminListItemSubGridComponent } from './components/admin-list-item-sub-grid/admin-list-item-sub-grid.component';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { AdminListItemTypeEntityConfigurationService } from './services/admin-list-item-type-entity-configuration.service';

@NgModule({
  declarations: [
    AdminListItemTypeCreateComponent, 
    AdminListItemTypeViewEditComponent, 
    AdminListItemViewEditComponent, 
    AdminListItemCreateComponent, 
    AdminListItemSubGridComponent
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
    { provide: ENTITY_CONFIG, useClass: AdminListItemTypeEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: AdminListItemTypeListConfigurationService },    
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService },
    EntityListingContextService,        
    EntityCreateContextService,    
    EntitySecurityService    
  ],
  entryComponents: [
    AdminListItemTypeCreateComponent, 
    AdminListItemTypeViewEditComponent,
    AdminListItemViewEditComponent, 
    AdminListItemCreateComponent
  ]
})
export class AdminListItemTypeModule { }
