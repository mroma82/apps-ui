import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminPermissionsListPageComponent } from './pages/permissions/admin-permissions-list-page/admin-permissions-list-page.component';
import { AdminPermissionsEditPageComponent } from './pages/permissions/admin-permissions-edit-page/admin-permissions-edit-page.component';
import { AdminPermissionsContainerComponent } from './containers/admin-permissions-container/admin-permissions-container.component';
import { AdminListItemContainerComponent } from './containers/admin-list-item-container/admin-list-item-container.component';
import { AdminListItemListPageComponent } from './pages/list-items/admin-list-item-list-page/admin-list-item-list-page.component';
import { AdminListItemEditPageComponent } from './pages/list-items/admin-list-item-edit-page/admin-list-item-edit-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: AdminContainerComponent,
      children: [
          { path: '', component: AdminHomePageComponent },

          {
            path: 'list-items',
            component: AdminListItemContainerComponent,
            children: [
              { path: '', component: AdminListItemListPageComponent },
              { path: 'edit/:key', component: AdminListItemEditPageComponent },
              { path: 'edit', redirectTo: '' }
            ]
          },
          
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
