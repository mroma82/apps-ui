import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityViewEditComponent } from './components/entity/view-edit/entity-view-edit/entity-view-edit.component';
import { EntityViewEditPageGenericComponent } from './components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';
import { AppCommonModule } from '../common/app-common.module';
import { AppFoundationModule } from '../foundation/app-foundation.module';
import { EntityCreateModalComponent } from './components/entity/create/entity-create-modal/entity-create-modal.component';
import { EntityContainerComponent } from './components/entity/container/entity-container/entity-container.component';
import { RouterModule } from '@angular/router';
import { EntityListingFiltersComponent } from './components/entity/listing/entity-listing-filters/entity-listing-filters.component';
import { EntityListingPageGenericComponent } from './components/entity/listing/entity-listing-page-generic/entity-listing-page-generic.component';
import { EntityListingResultsComponent } from './components/entity/listing/entity-listing-results/entity-listing-results.component';
import { EntityListingViewsComponent } from './components/entity/listing/entity-listing-views/entity-listing-views.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { EntityApiService } from './services/entity/entity-api.service';
import { EntitySubGridComponent } from './components/entity/sub-grid/entity-sub-grid/entity-sub-grid.component';
import { EntityCreateComponent } from './components/entity/create/entity-create/entity-create.component';
import { EntitySubGridViewEditComponent } from './components/entity/sub-grid/entity-sub-grid-view-edit/entity-sub-grid-view-edit.component';
import { EntitySubGridViewEditModalComponent } from './components/entity/sub-grid/entity-sub-grid-view-edit-modal/entity-sub-grid-view-edit-modal.component';
import { EntitySingleRecordPageGenericComponent } from './components/entity/single-record/entity-single-record-page-generic/entity-single-record-page-generic.component';
import { EntitySingleRecordViewEditComponent } from './components/entity/single-record/entity-single-record-view-edit/entity-single-record-view-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntityProviderService } from './services/entity/entity-provider.service';
import { EntityTypeNamePipe } from './pipes/entity/entity-type-name.pipe';
import { SelectListService } from './services/select-list.service';

@NgModule({
  declarations: [    
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,    
    EntityCreateModalComponent,
    EntityContainerComponent,
    EntityListingResultsComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent,
    EntityCreateComponent,
    EntitySubGridComponent,
    EntitySubGridViewEditModalComponent,
    EntitySubGridViewEditComponent,
    EntitySingleRecordPageGenericComponent,
    EntitySingleRecordViewEditComponent,
    EntityTypeNamePipe   
  ],
  imports: [
    CommonModule,     
    RouterModule,
    FormsModule,    
    NgxDatatableModule,
    NgbModule,
    AppCommonModule,
    AppFoundationModule,    
  ],
  providers: [
    EntityApiService,
    EntityProviderService,
    SelectListService
  ],
  exports: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,
    EntityContainerComponent,
    EntityListingResultsComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent,
    EntitySubGridComponent,
    EntitySingleRecordPageGenericComponent,
    EntitySingleRecordViewEditComponent,
    EntityTypeNamePipe
  ]
})
export class AppsCoreModule { }
