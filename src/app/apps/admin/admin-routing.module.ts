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
import { AdminWorkflowGroupContainerComponent } from './containers/admin-workflow-group-container/admin-workflow-group-container.component';
import { AdminWorkflowGroupListPageComponent } from './pages/workflow-groups/admin-workflow-group-list-page/admin-workflow-group-list-page.component';
import { AdminWorkflowGroupEditPageComponent } from './pages/workflow-groups/admin-workflow-group-edit-page/admin-workflow-group-edit-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: AdminContainerComponent,
      children: [
          { path: '', component: AdminHomePageComponent },
          
          { 
            path: 'permissions', 
            component: AdminPermissionsContainerComponent,
            children: [
              { path: '', component: AdminPermissionsListPageComponent },
              { path: 'edit/:key', component: AdminPermissionsEditPageComponent },
              { path: 'edit', redirectTo: '' }
            ]
          },

          { 
            path: 'workflow-groups', 
            component: AdminWorkflowGroupContainerComponent,
            children: [
              { path: '', component: AdminWorkflowGroupListPageComponent },
              { path: 'edit/:id', component: AdminWorkflowGroupEditPageComponent },
              { path: 'edit', redirectTo: '' }
            ]
          },

          {
            path: 'security-roles',        
            loadChildren: './security-roles/admin-security-roles.module#AdminSecurityRolesModule'
          },
          {
            path: 'system-users',        
            loadChildren: './system-users/admin-system-users.module#AdminSystemUsersModule'
          },
          {
            path: 'list-items',        
            loadChildren: './list-item-types/admin-list-item-type.module#AdminListItemTypeModule'
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
