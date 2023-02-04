import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { ExampleNavComponent } from './components/example-nav/example-nav.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ExampleRoutingModule } from './example-routing.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { ExampleService } from './services/example.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExampleListFilterComponent } from './components/example-list-filter/example-list-filter.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExampleCreateComponent } from './components/example-create/example-create.component';
import { ExampleListsService } from './services/example-lists.service';
import { AppsCoreModule } from 'src/app/core/core.module';
import { ExampleListingConfigurationService } from './services/example-listing-configuration.service';
import { ExampleViewEditPageComponent } from './pages/example-view-edit-page/example-view-edit-page.component';
import { ExampleViewEditFormComponent } from './components/example-view-edit-form/example-view-edit-form.component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { ExampleLineCreateComponent } from './components/example-line-create/example-line-create.component';
import { ExampleLineViewEditComponent } from './components/example-line-view-edit/example-line-view-edit.component';
import { ExampleLineSubGridComponent } from './components/example-line-sub-grid/example-line-sub-grid.component';
import { ExampleParametersPageComponent } from './pages/example-parameters-page/example-parameters-page.component';
import { ExampleParametersComponent } from './components/example-parameters/example-parameters.component';
import { EntityValidationService, ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { ENTITY_LISTING_CONFIG } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntitySecurityService } from 'src/app/core/services/entity/entity-security.service';
import { ExampleEntityConfigurationService } from './services/example-entity-configuration.service';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { ExampleDashboardPageComponent } from './pages/example-dashboard-page/example-dashboard-page.component';

@NgModule({
  declarations: [
    ExampleContainerComponent,
    ExampleListPageComponent,
    ExampleViewEditPageComponent,
    ExampleViewEditFormComponent,
    ExampleNavComponent,
    ExampleListFilterComponent,
    ExampleCreateComponent,
    ExampleLineCreateComponent,
    ExampleLineViewEditComponent,
    ExampleLineSubGridComponent,
    ExampleParametersPageComponent,
    ExampleParametersComponent,
    ExampleDashboardPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,
    ExampleRoutingModule,
    NgxDatatableModule,
    FormsModule,
    BsDatepickerModule
  ],
  providers: [
    ExampleService,
    ExampleListsService,
    { provide: ENTITY_CONFIG, useClass: ExampleEntityConfigurationService },
    { provide: ENTITY_LISTING_CONFIG, useClass: ExampleListingConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService },
    EntityListingContextService,
    EntityCreateContextService,
    EntitySecurityService
  ],
  entryComponents: [
    ExampleCreateComponent,
    ExampleViewEditFormComponent,
    ExampleLineCreateComponent,
    ExampleLineViewEditComponent,
    ExampleParametersComponent
  ]
})
export class ExampleAppModule { }
