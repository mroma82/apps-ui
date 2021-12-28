import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { debounce, map, tap } from 'rxjs/operators';
import { DialogService } from '../../../../common/services/dialog.service';
import { AdminBillingApiService } from './admin-billing-api.service';

@Injectable()
export class AdminBillingPaymentMethodsContextService {

  // state
  defaultPaymentMethodId$ = new BehaviorSubject<string>(null);
  methods$ = new BehaviorSubject<any[]>([]);

  // busy
  busyStore$ = new BehaviorSubject<boolean>(false);
  busy$ = this.busyStore$.asObservable().pipe(debounce(() => timer(200)));


  // new
  constructor(
    private api: AdminBillingApiService,
    private dialog: DialogService
  ) { }

  // refresh data
  refreshData() {

    // set busy
    this.busyStore$.next(true);

    // get the subscription
    this.api.getSubscription().pipe(tap(x => this.busyStore$.next(false))).subscribe(x =>
      this.defaultPaymentMethodId$.next(x.defaultPaymentMethodId))

    // get payment methods
    this.api.getPaymentMethods().pipe(tap(x => this.busyStore$.next(false))).subscribe(x =>
      this.methods$.next(x));
  }

  // set default
  setDefaultPaymentMethod(method: any): Observable<boolean> {

    // set busy
    this.busyStore$.next(true);

    // update    
    return this.api.setDefaultPaymentMethod(method.paymentMethodType, method.paymentMethodId).pipe(tap(x => {
      this.busyStore$.next(false);

      // check status
      if (!x.success) {
        this.dialog.message("Error", x.text);
      } else {
        this.refreshData();
      }

    }), map(x => x.success));
  }

  // remove
  removePaymentMethod(method: any): Observable<boolean> {

    // busy
    this.busyStore$.next(true);

    // remove    
    return this.api.removePaymentMethod(method.paymentMethodType, method.paymentMethodId).pipe(tap(x => {
      this.busyStore$.next(false);

      // check status
      if (!x.success) {
        this.dialog.message("Error", x.text);
      } else {
        this.refreshData();
      }

    }), map(x => x.success));
  }
}
