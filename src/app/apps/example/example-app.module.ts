import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { ExampleViewPageComponent } from './pages/example-view-page/example-view-page.component';
import { ExampleViewEditFormComponent } from './components/example-view-edit-form/example-view-edit-form.component';
import { ExampleNavComponent } from './components/example-nav/example-nav.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ExampleRoutingModule } from './example-routing.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { ExampleService } from './services/example.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExampleListFilterComponent } from './components/example-list-filter/example-list-filter.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExampleCreateDialogComponent } from './dialogs/example-create-dialog/example-create-dialog.component';
import { ExampleCreateComponent } from './components/example-create/example-create.component';
import { ExampleCreateContextService } from './services/example-create-context.service';
import { ExampleListsService } from './services/example-lists.service';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';
import { IListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';
import { EntityConfigurationService } from 'src/app/common/services/entity/entity-configuration.service';
import { EntityViewEditConfigurationService } from 'src/app/common/services/entity/view-edit/entity-view-edit-configuration.service';
import { AppsCoreModule } from 'src/app/core/core.module';
import { ExampleListingConfigurationService } from './services/example-listing-configuration.service';

@NgModule({
  declarations: [    
    ExampleContainerComponent,
    ExampleListPageComponent,
    ExampleViewPageComponent,    
    ExampleViewEditFormComponent,  
    ExampleNavComponent,
    ExampleListFilterComponent,
    ExampleCreateDialogComponent,
    ExampleCreateComponent
  ],
  imports: [
    CommonModule,    
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,
    ExampleRoutingModule,
    NgxDatatableModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ExampleService,    
    ExampleCreateContextService,
    ExampleListsService,
    EntityConfigurationService,
    { provide: 'IListingConfigurationService', useClass: ExampleListingConfigurationService },    
    ListingContextService,    
    EntityViewEditConfigurationService
  ]
})
export class ExampleAppModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService    
  ) { 

    // entity
    entityConfig.entityTypeId = "e1d39dfa-2940-4434-a7e4-2c85d2d2fe47";
    entityConfig.contextType = 1;
    entityConfig.rootUrl = "/app/example";

    // workflow
    entityConfig.workflow.enabled = true;
    entityConfig.workflow.url = "/example/workflow";
    entityConfig.workflow.prefixText = "Approval Workflow";        
  }
}
