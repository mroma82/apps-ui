import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { ExampleViewPageComponent } from './pages/example-view-page/example-view-page.component';
import { ExampleEditPageComponent } from './pages/example-edit-page/example-edit-page.component';
import { ExampleViewEditComponent } from './components/example-view-edit/example-view-edit.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ExampleNavComponent } from './components/example-nav/example-nav.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { ExampleRoutingModule } from './example-routing.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { ExampleService } from './services/example.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExampleListFilterComponent } from './components/example-list-filter/example-list-filter.component';
import { FormsModule } from '@angular/forms';
import { ExampleListContextService } from './services/example-list-context.service';

@NgModule({
  declarations: [    
    ExampleContainerComponent,
    ExampleListPageComponent,
    ExampleViewPageComponent,
    ExampleEditPageComponent,
    ExampleViewEditComponent,
    ExampleListComponent,
    ExampleNavComponent,
    ExampleListFilterComponent
  ],
  imports: [
    CommonModule,    
    AppCommonModule,
    AppFoundationModule,
    ExampleRoutingModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    ExampleService,
    ExampleListContextService
  ]
})
export class ExampleAppModule { }
