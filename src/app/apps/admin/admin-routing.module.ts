import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminDropDownListPageComponent } from './pages/admin-drop-down-list-page/admin-drop-down-list-page.component';
import { AdminDropDownEditPageComponent } from './pages/admin-drop-down-edit-page/admin-drop-down-edit-page.component';
import { AdminPermissionsListPageComponent } from './pages/admin-permissions-list-page/admin-permissions-list-page.component';
import { AdminPermissionsEditPageComponent } from './pages/admin-permissions-edit-page/admin-permissions-edit-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: AdminContainerComponent,
      children: [
          { path: '', component: AdminHomePageComponent },
          { path: 'drop-down', component: AdminDropDownListPageComponent },
          { path: 'drop-down/edit/:type', component: AdminDropDownEditPageComponent },
          { path: 'permissions', component: AdminPermissionsListPageComponent },
          { path: 'permissions/:key', component: AdminPermissionsEditPageComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class AdminRoutingModule { 
  
}
