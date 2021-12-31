import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminBillingMainPageComponent } from './pages/admin-billing-main-page/admin-billing-main-page.component';
import { AdminBillingContainerComponent } from './containers/admin-billing-container/admin-billing-container.component';
import { AdminBillingGuard } from './admin-billing.guard';

// routing
const routes: Routes = [
  {
    path: '',
    component: AdminBillingContainerComponent,
    canActivate: [AdminBillingGuard],
    children: [
      { path: '', component: AdminBillingMainPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBillingRoutingModule {

}
