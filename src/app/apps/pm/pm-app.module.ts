import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmHomePageComponent } from './pages/pm-home-page/pm-home-page.component';
import { PmContainerComponent } from './containers/pm-container/pm-container.component';
import { PmAppRoutingModule } from './pm-app-routing.module';
import { PmNavComponent } from './components/pm-nav/pm-nav.component';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { PmListsService } from './services/pm-lists.service';
import { PmService } from './services/pm.service';



@NgModule({
  declarations: [
    PmHomePageComponent, 
    PmContainerComponent, 
    PmNavComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    PmAppRoutingModule
  ],
  providers: [
    PmService,
    PmListsService
  ]
})
export class PmAppModule { }
