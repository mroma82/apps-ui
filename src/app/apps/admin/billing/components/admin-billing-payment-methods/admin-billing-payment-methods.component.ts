import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../common/services/dialog.service';
import { DialogResultEnum } from '../../../../../common/types/dialogs/dialog-result.enum';
import { AdminBillingPaymentMethodsContextService } from '../../services/admin-billing-payment-methods-context.service';

@Component({
  selector: 'app-admin-billing-payment-methods',
  templateUrl: './admin-billing-payment-methods.component.html',
  styleUrls: ['./admin-billing-payment-methods.component.scss']
})
export class AdminBillingPaymentMethodsComponent implements OnInit {

  // state
  defaultPaymentMethodId$ = this.context.defaultPaymentMethodId$;
  paymentMethods$ = this.context.methods$;
  busy$ = this.context.busy$;

  // new
  constructor(
    private context: AdminBillingPaymentMethodsContextService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.context.refreshData();
  }

  // set default payment method
  setDefaultPaymentMethod(item: any) {
    this.context.setDefaultPaymentMethod(item).subscribe();
  }

  // remove payment method
  removeDefaultPaymentMethod(item: any) {

    // ask
    this.dialog.yesNo("Payment Methods", "Are you sure you want to delete this payment method?").subscribe(x => {
      if (x == DialogResultEnum.Yes) {
        this.context.removePaymentMethod(item).subscribe();
      }
    })
  }
}
