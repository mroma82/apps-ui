import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { debounce, shareReplay, tap } from 'rxjs/operators';
import { DialogService } from '../../../../common/services/dialog.service';
import { DialogResultEnum } from '../../../../common/types/dialogs/dialog-result.enum';
import { AdminBillingApiService } from './admin-billing-api.service';

@Injectable()
export class AdminBillingSubscriptionContextService {

  // state
  subscription$ = new BehaviorSubject<{ productId: string, licenseCount: number }>(null);
  products$ = this.api.getAvailableProducts().pipe(shareReplay());

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

    // get the product
    this.busyStore$.next(true);
    this.api.getSubscription().subscribe(x => {
      this.subscription$.next({
        productId: x.productId,
        licenseCount: x.licenseCount
      });
      this.busyStore$.next(false);
    });
  }

  // update product
  updateProductId(productId: string): Observable<boolean> {

    // update
    this.busyStore$.next(true);
    return this.api.updateProductId(productId).pipe(tap(x => {
      this.busyStore$.next(false);
      if (!x.success) {
        this.dialog.message("Subscription Update Error", x.text);
      } else {
        this.refreshData();
      }
    }));
  }

  // update license count
  updateLicenseCount(licenseCount: number): Observable<boolean> {

    // update
    this.busyStore$.next(true);
    return this.api.updateLicenseCount(licenseCount).pipe(tap(x => {
      this.busyStore$.next(false);
      if (!x.success) {
        this.dialog.message("Subscription Update Error", x.text);
      } else {
        this.refreshData();
      }
    }));
  }
}
