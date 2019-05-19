import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';
import { PurchaseReqContainerComponent } from './containers/purchase-req-container/purchase-req-container.component';
import { PurchaseReqListPageComponent } from './pages/purchase-req-list-page/purchase-req-list-page.component';
import { PurchaseReqViewPageComponent } from './pages/purchase-req-view-page/purchase-req-view-page.component';
import { PurchaseReqEditPageComponent } from './pages/purchase-req-edit-page/purchase-req-edit-page.component';

// routing
const routes: Routes = [
  {
      path: '',
      component: PurchaseReqContainerComponent,
      children: [
          { path: '', component: PurchaseReqListPageComponent },
          { path: 'mytasks', component: PurchaseReqListPageComponent, data: { isMyTasks: true } },
          { path: 'view/:id', component: PurchaseReqViewPageComponent },
          { path: 'edit/:id', component: PurchaseReqEditPageComponent, canActivate: [RecordLockGuard] }
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecordLockGuard]
})
export class PurchaseReqRoutingModule { 

  constructor(
    recordLock: RecordLockGuard
  ) {
    recordLock.setContextType(1000);
  }
}
