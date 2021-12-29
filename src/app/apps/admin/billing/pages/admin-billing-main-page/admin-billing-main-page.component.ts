import { Component, OnInit } from '@angular/core';
import { AdminBillingContextService } from '../../services/admin-billing-context.service';
import { AdminBillingDetailsContextService } from '../../services/admin-billing-details-context.service';
import { AdminBillingPaymentMethodCreateContextService } from '../../services/admin-billing-payment-method-create-context.service';
import { AdminBillingPaymentMethodsContextService } from '../../services/admin-billing-payment-methods-context.service';
import { AdminBillingSubscriptionContextService } from '../../services/admin-billing-subscription-context.service';

@Component({
  selector: 'app-admin-billing-main-page',
  templateUrl: './admin-billing-main-page.component.html',
  styleUrls: ['./admin-billing-main-page.component.sass'],
  providers: [
    AdminBillingContextService,
    AdminBillingPaymentMethodsContextService,
    AdminBillingDetailsContextService,
    AdminBillingSubscriptionContextService,
    AdminBillingPaymentMethodCreateContextService
  ]
})
export class AdminBillingMainPageComponent implements OnInit {

  // new
  constructor() { }

  ngOnInit(): void {

  }
}
