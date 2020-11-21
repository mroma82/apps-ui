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
import { ExampleCreateDialogComponent } from './dialogs/example-create-dialog/example-create-dialog.component';
import { ExampleCreateComponent } from './components/example-create/example-create.component';
import { ExampleCreateContextService } from './services/example-create-context.service';
import { ExampleListsService } from './services/example-lists.service';
import { EntityViewEditConfigurationService } from 'src/app/core/services/entity/view-edit/entity-view-edit-configuration.service';
import { AppsCoreModule } from 'src/app/core/core.module';
import { ExampleListingConfigurationService } from './services/example-listing-configuration.service';
import { ExampleViewEditPageComponent } from './pages/example-view-edit-page/example-view-edit-page.component';
import { ExampleViewEditFormComponent } from './components/example-view-edit-form/example-view-edit-form.component';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@NgModule({
  declarations: [    
    ExampleContainerComponent,
    ExampleListPageComponent,        
    ExampleViewEditPageComponent,  
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
    { provide: 'IEntityListingConfigurationService', useClass: ExampleListingConfigurationService },    
    EntityListingContextService,    
    EntityViewEditConfigurationService,
    EntityCreateContextService
  ],
  entryComponents: [
    ExampleViewEditFormComponent
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
    
    // create
    entityConfig.createFormComponent = ExampleCreateComponent;
  }
}
