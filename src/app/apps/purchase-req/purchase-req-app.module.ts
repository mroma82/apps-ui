import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseReqContainerComponent } from './containers/purchase-req-container/purchase-req-container.component';
import { PurchaseReqListPageComponent } from './pages/purchase-req-list-page/purchase-req-list-page.component';
import { PurchaseReqViewPageComponent } from './pages/purchase-req-view-page/purchase-req-view-page.component';
import { PurchaseReqEditPageComponent } from './pages/purchase-req-edit-page/purchase-req-edit-page.component';
import { PurchaseReqListComponent } from './components/list/purchase-req-list/purchase-req-list.component';
import { PurchaseReqListFilterComponent } from './components/list/purchase-req-list-filter/purchase-req-list-filter.component';
import { PurchaseReqRoutingModule } from './purchase-req-routing.module';
import { PurchaseReqNavComponent } from './components/shared/purchase-req-nav/purchase-req-nav.component';

@NgModule({
  declarations: [
    PurchaseReqContainerComponent, 
    PurchaseReqListPageComponent, 
    PurchaseReqViewPageComponent, 
    PurchaseReqEditPageComponent, 
    PurchaseReqListComponent, 
    PurchaseReqListFilterComponent, PurchaseReqNavComponent
  ],
  imports: [
    CommonModule,
    PurchaseReqRoutingModule
  ]
})
export class PurchaseReqAppModule { }
