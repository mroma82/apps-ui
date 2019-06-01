import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminDropDownListPageComponent } from './pages/admin-drop-down-list-page/admin-drop-down-list-page.component';
import { AdminDropDownEditPageComponent } from './pages/admin-drop-down-edit-page/admin-drop-down-edit-page.component';
import { AdminPermissionsListPageComponent } from './pages/permissions/admin-permissions-list-page/admin-permissions-list-page.component';
import { AdminPermissionsEditPageComponent } from './pages/permissions/admin-permissions-edit-page/admin-permissions-edit-page.component';
import { AdminPermissionsContainerComponent } from './containers/admin-permissions-container/admin-permissions-container.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: AdminContainerComponent,
      children: [
          { path: '', component: AdminHomePageComponent },
          { path: 'drop-down', component: AdminDropDownListPageComponent },
          { path: 'drop-down/edit/:type', component: AdminDropDownEditPageComponent },
          
          { 
            path: 'permissions', 
            component: AdminPermissionsContainerComponent,
            children: [
              { path: '', component: AdminPermissionsListPageComponent },
              { path: 'edit/:key', component: AdminPermissionsEditPageComponent },
              { path: 'edit', redirectTo: '' }
            ]
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class AdminRoutingModule { 
  
}
