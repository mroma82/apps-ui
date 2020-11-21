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

@NgModule({
  declarations: [    
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,    
    EntityCreateModalComponent,
    EntityContainerComponent,
    EntityListingResultsComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent
  ],
  imports: [
    CommonModule,     
    RouterModule,
    FormsModule,    
    NgxDatatableModule,
    AppCommonModule,
    AppFoundationModule,    
  ],
  providers: [
    EntityApiService
  ],
  exports: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,
    EntityContainerComponent,
    EntityListingResultsComponent,
    EntityListingViewsComponent,
    EntityListingFiltersComponent,
    EntityListingPageGenericComponent
  ]
})
export class AppsCoreModule { }
