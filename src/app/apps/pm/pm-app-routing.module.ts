import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PmContainerComponent } from './containers/pm-container/pm-container.component';
import { PmHomePageComponent } from './pages/pm-home-page/pm-home-page.component';
import { PmParametersPageComponent } from './pages/pm-parameters-page/pm-parameters-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: PmContainerComponent,
      children: [
          { path: '', component: PmHomePageComponent },
          { path: 'parameters', component: PmParametersPageComponent },
          
          {
            path: 'items',        
            loadChildren: () => import('./modules/items/pm-item.module').then(m => m.PmItemModule)
          },
          {
            path: 'activities',        
            loadChildren: () => import('./modules/activities/pm-activity.module').then(m => m.PmActivityModule)
          },
          {
            path: 'events',        
            loadChildren: () => import('./modules/events/pm-event.module').then(m => m.PmEventModule)
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class PmAppRoutingModule { }
