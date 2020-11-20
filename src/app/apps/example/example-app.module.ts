import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { ExampleViewPageComponent } from './pages/example-view-page/example-view-page.component';
import { ExampleEditPageComponent } from './pages/example-edit-page/example-edit-page.component';
import { ExampleViewEditComponent } from './components/example-view-edit/example-view-edit.component';
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
import { ListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';
import { EntityConfigurationService } from 'src/app/common/services/entity/entity-configuration.service';
import { EntityViewEditConfigurationService } from 'src/app/common/services/entity/view-edit/entity-view-edit-configuration.service';
import { EntityViewEditContextService } from 'src/app/common/services/entity/view-edit/entity-view-edit-context.service';
import { AppsCoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [    
    ExampleContainerComponent,
    ExampleListPageComponent,
    ExampleViewPageComponent,
    ExampleEditPageComponent,
    ExampleViewEditComponent,  
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
    ListingConfigurationService,
    ListingContextService,    
    EntityViewEditConfigurationService
  ]
})
export class ExampleAppModule { 

  // new
  constructor(
    entityConfig: EntityConfigurationService
  ) { 
    // setup
    entityConfig.entityTypeId = "e1d39dfa-2940-4434-a7e4-2c85d2d2fe47";
    entityConfig.contextType = 1;

    // workflow
    entityConfig.workflow.enabled = true;
    entityConfig.workflow.url = "/example/workflow";
  }
}
