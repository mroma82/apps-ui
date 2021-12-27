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
        loadChildren: () => import('./security-roles/admin-security-roles.module').then(m => m.AdminSecurityRolesModule)
      },
      {
        path: 'system-users',
        loadChildren: () => import('./system-users/admin-system-users.module').then(m => m.AdminSystemUsersModule)
      },
      {
        path: 'list-items',
        loadChildren: () => import('./list-item-types/admin-list-item-type.module').then(m => m.AdminListItemTypeModule)
      },
      {
        path: 'workflow-groups',
        loadChildren: () => import('./workflow-groups/admin-workflow-group.module').then(m => m.AdminWorkflowGroupModule)
      },
      {
        path: 'number-sequences',
        loadChildren: () => import('./number-sequences/admin-number-sequence.module').then(m => m.AdminNumberSequenceModule)
      },
      {
        path: 'billing',
        loadChildren: () => import('./billing/admin-billing.module').then(m => m.AdminBillingModule)
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
