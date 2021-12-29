import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DialogService } from '../../../../common/services/dialog.service';
import { AdminBillingPaymentMethodCreate } from '../models/admin-billing-payment-method-create';
import { AdminBillingApiService } from './admin-billing-api.service';

@Injectable()
export class AdminBillingPaymentMethodCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);
  model$ = new BehaviorSubject<AdminBillingPaymentMethodCreate>(null);

  // new
  constructor(
    private api: AdminBillingApiService,
    private dialog: DialogService
  ) {

    // init clear
    this.clear();
  }

  // open dialog
  openDialog() {
    this.clear();
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // clear
  clear() {
    this.model$.next({
      paymentMethodType: 1
    });
  }

  // create
  create(): Observable<boolean> {
    let model = this.model$.value;

    // validate
    if (!this.validate(model))
      return of(false);

    // create
    return this.api.addPaymentMethod(model).pipe(tap(x => {

      // check if success
      if (x.success) {
        this.closeDialog();
      } else {
        this.dialog.message("Payment Method", x.text);
      }
    }), map(x => x.success));
  }

  // validate
  validate(model: AdminBillingPaymentMethodCreate): boolean {

    // define error
    var doError = (text: string) => {
      this.dialog.message("Payment Method", text);
      return false;
    }

    // check the type
    if (model.paymentMethodType === 0) {
      return doError("You must select a payment type");
    }

    // check payment method
    switch (model.paymentMethodType) {

      // validate card
      case 1:
        // check fields
        if (!model.cardNumber || !model.cardExpirationMonth || !model.cardExpirationYear || !model.cardCvc) {
          return doError("You must fill in all the credit card details");
        }
        break;

      // validate bank
      case 2:
        // check fields
        if (!model.bankAccountName || !model.bankAccountRouting || !model.bankAccountNumber || !model.bankAccountType || !model.bankAccountCountry) {
          return doError("You must fill in all the bank account details");
        }
    }

    // if here, then ok
    return true;
  }
}
