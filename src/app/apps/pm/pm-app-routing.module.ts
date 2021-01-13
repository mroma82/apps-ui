import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PmContainerComponent } from './containers/pm-container/pm-container.component';
import { PmHomePageComponent } from './pages/pm-home-page/pm-home-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: PmContainerComponent,
      children: [
          { path: '', component: PmHomePageComponent },
          
          {
            path: 'items',        
            loadChildren: () => import('./modules/items/pm-item.module').then(m => m.PmItemModule)
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class PmAppRoutingModule { }
