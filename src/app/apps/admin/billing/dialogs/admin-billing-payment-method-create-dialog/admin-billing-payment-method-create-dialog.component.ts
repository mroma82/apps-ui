import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from '../../../../../common/abstractions/base-dialog';
import { AdminBillingPaymentMethodCreate } from '../../models/admin-billing-payment-method-create';
import { AdminBillingPaymentMethodCreateContextService } from '../../services/admin-billing-payment-method-create-context.service';
import { AdminBillingPaymentMethodsContextService } from '../../services/admin-billing-payment-methods-context.service';

@Component({
  selector: 'app-admin-billing-payment-method-create-dialog',
  templateUrl: './admin-billing-payment-method-create-dialog.component.html',
  styleUrls: ['./admin-billing-payment-method-create-dialog.component.sass']
})
export class AdminBillingPaymentMethodCreateDialogComponent extends BaseDialog {
  @ViewChild('content', { static: true }) content: any;

  // new
  constructor(
    modalService: NgbModal,
    private context: AdminBillingPaymentMethodCreateContextService,
    private paymentMethodContext: AdminBillingPaymentMethodsContextService
  ) {
    super(modalService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }

  // init
  ngOnInit() {

  }

  // create
  create() {
    this.context.create().subscribe(success => {
      if (success) {

        // refresh parent
        this.paymentMethodContext.refreshData();
      }
    });
  }

  // dismiss
  dismiss() {
    this.context.dialogOpen$.next(false);
  }
}