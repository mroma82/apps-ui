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
import { PurchaseReqListContextService } from './services/purchase-req-list-context.service';
import { PurchaseReqApiService } from './services/purchase-req-api.service';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AppFoundationModule } from 'src/app/foundation/app-foundation.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    AppCommonModule,
    AppFoundationModule,
    PurchaseReqRoutingModule,
    NgxDatatableModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    PurchaseReqListContextService,
    PurchaseReqApiService
  ]
})
export class PurchaseReqAppModule { }
