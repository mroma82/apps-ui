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
import { EntityListingResultsDataTableComponent } from './components/entity/listing/entity-listing-results-data-table/entity-listing-results-data-table.component';
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
import { EntityFormComponent } from './components/entity/form/entity-form/entity-form.component';
import { EntityValidationService } from './services/entity/entity-validation.service';
import { AgGridModule } from 'ag-grid-angular';
import { EntityListingResultsAgGridComponent } from './components/entity/listing/entity-listing-results-ag-grid/entity-listing-results-ag-grid.component';
import { EntityInnerListComponent } from './components/entity/lists/entity-inner-list/entity-inner-list.component';

@NgModule({
  declarations: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,
    EntityCreateModalComponent,
    EntityContainerComponent,
    EntityListingResultsDataTableComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent,
    EntityCreateComponent,
    EntitySubGridComponent,
    EntitySubGridViewEditModalComponent,
    EntitySubGridViewEditComponent,
    EntitySingleRecordPageGenericComponent,
    EntitySingleRecordViewEditComponent,
    EntityTypeNamePipe,
    EntityFormComponent,
    EntityListingResultsAgGridComponent,
    EntityInnerListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatatableModule,
    NgbModule,
    AppCommonModule,
    AppFoundationModule,
    AgGridModule
  ],
  providers: [
    EntityApiService,
    EntityProviderService,
    EntityValidationService,
    SelectListService
  ],
  exports: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,
    EntityContainerComponent,
    EntityListingResultsDataTableComponent,
    EntityListingResultsAgGridComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent,
    EntitySubGridComponent,
    EntitySingleRecordPageGenericComponent,
    EntitySingleRecordViewEditComponent,
    EntityTypeNamePipe,
    EntityFormComponent,
    EntityInnerListComponent
  ]
})
export class AppsCoreModule { }
