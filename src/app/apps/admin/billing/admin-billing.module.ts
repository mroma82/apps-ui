import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBillingMainPageComponent } from './pages/admin-billing-main-page/admin-billing-main-page.component';
import { AdminBillingPaymentMethodsComponent } from './components/admin-billing-payment-methods/admin-billing-payment-methods.component';
import { AdminBillingDetailsComponent } from './components/admin-billing-details/admin-billing-details.component';
import { AdminBillingSubscriptionComponent } from './components/admin-billing-subscription/admin-billing-subscription.component';
import { AdminBillingApiService } from './services/admin-billing-api.service';
import { AdminBillingContainerComponent } from './containers/admin-billing-container/admin-billing-container.component';
import { AdminBillingRoutingModule } from './admin-billing-routing.module';
import { AppCommonModule } from '../../../common/app-common.module';
import { AppsCoreModule } from '../../../core/core.module';
import { FormsModule } from '@angular/forms';
import { AdminBillingPaymentMethodCreateDialogComponent } from './dialogs/admin-billing-payment-method-create-dialog/admin-billing-payment-method-create-dialog.component';
import { AdminBillingPaymentMethodCreateComponent } from './components/admin-billing-payment-method-create/admin-billing-payment-method-create.component';



@NgModule({
  declarations: [
    AdminBillingMainPageComponent,
    AdminBillingPaymentMethodsComponent,
    AdminBillingDetailsComponent,
    AdminBillingSubscriptionComponent,
    AdminBillingContainerComponent,
    AdminBillingPaymentMethodCreateDialogComponent,
    AdminBillingPaymentMethodCreateComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AppsCoreModule,
    FormsModule,
    AdminBillingRoutingModule
  ],
  providers: [
    AdminBillingApiService
  ]
})
export class AdminBillingModule { }
