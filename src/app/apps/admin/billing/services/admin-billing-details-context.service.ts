import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { debounce, tap } from 'rxjs/operators';
import { DialogService } from '../../../../common/services/dialog.service';
import { AdminBillingApiService } from './admin-billing-api.service';

@Injectable()
export class AdminBillingDetailsContextService {

  // state
  details$ = new BehaviorSubject<{ billingName: string, billingEmail: string }>(null);

  // busy
  busyStore$ = new BehaviorSubject<boolean>(false);
  busy$ = this.busyStore$.asObservable().pipe(debounce(() => timer(200)));

  // new
  constructor(
    private api: AdminBillingApiService,
    private dialog: DialogService
  ) { }

  // function that refreshes the details
  refreshDetails(): void {
    this.details$.next({
      billingName: "Test Name",
      billingEmail: "test@email.com"
    });
  }

  // update
  updateDetails(model: { billingName: string, billingEmail: string }): Observable<boolean> {

    // validate
    if (!model.billingEmail || !model.billingName) {
      this.dialog.message("Validation", "Billing name and email are required");
      return of(false);
    }

    // busy
    this.busyStore$.next(true);

    // mock
    return of(true).pipe(tap(success => {
      this.busyStore$.next(false);

      if (success) {
        this.refreshDetails();
      }
    }));
  }
}
