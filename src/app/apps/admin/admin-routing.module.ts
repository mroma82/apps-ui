import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: AdminContainerComponent,
      children: [
          { path: '', component: AdminHomePageComponent },
          

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
          },
          {
            path: 'workflow-groups',        
            loadChildren: './workflow-groups/admin-workflow-group.module#AdminWorkflowGroupModule'
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
