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



@NgModule({
  declarations: [
    PmHomePageComponent, 
    PmContainerComponent, 
    PmNavComponent, 
    PmParametersPageComponent, 
    PmParametersComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppsCoreModule,
    AppFoundationModule,
    FormsModule,
    PmAppRoutingModule
  ],
  providers: [
    PmService,
    PmListsService
  ]
})
export class PmAppModule { }
