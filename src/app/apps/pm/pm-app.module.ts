import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmHomePageComponent } from './pages/pm-home-page/pm-home-page.component';
import { PmContainerComponent } from './containers/pm-container/pm-container.component';
import { PmAppRoutingModule } from './pm-app-routing.module';
import { PmNavComponent } from './components/pm-nav/pm-nav.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { PmListsService } from './services/pm-lists.service';
import { PmService } from './services/pm.service';
import { PmParametersPageComponent } from './pages/pm-parameters-page/pm-parameters-page.component';
import { PmParametersComponent } from './components/pm-parameters/pm-parameters.component';
import { AppsCoreModule } from 'src/app/core/core.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { FormsModule } from '@angular/forms';
import { PmAgendaPageComponent } from './pages/pm-agenda-page/pm-agenda-page.component';
import { PmAgendaFiltersComponent } from './components/agenda/pm-agenda-filters/pm-agenda-filters.component';
import { PmAgendaListComponent } from './components/agenda/pm-agenda-list/pm-agenda-list.component';
import { PmAgendaApiService } from './services/agenda/pm-agenda-api.service';
import { PmAgendaDebugComponent } from './components/agenda/pm-agenda-debug/pm-agenda-debug.component';
import { PmEventModule } from './modules/events/pm-event.module';
import { PmEventApiService } from './modules/events/services/pm-event-api.service';



@NgModule({
  declarations: [
    PmHomePageComponent,
    PmContainerComponent,
    PmNavComponent,
    PmParametersPageComponent,
    PmParametersComponent,
    PmAgendaPageComponent,
    PmAgendaFiltersComponent,
    PmAgendaListComponent,
    PmAgendaDebugComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,
    FormsModule,
    PmAppRoutingModule,
    PmEventModule
  ],
  providers: [
    PmService,
    PmListsService,
    PmAgendaApiService,
    PmEventApiService
  ]
})
export class PmAppModule { }
