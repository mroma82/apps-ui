import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from '../../../../common/services/dialog.service';
import { AdminBillingApiService } from './admin-billing-api.service';

@Injectable()
export class AdminBillingDetailsContextService {

  // state
  details$ = new BehaviorSubject<{ billingName: string, billingEmail: string }>(null);

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
  updateDetails(model: { billingName: string, billingEmail, string }): Observable<boolean> {

    // validate
    if (!model.billingEmail || !model.billingName) {
      this.dialog.message("Validation", "Billing name and email are required");
      return of(false);
    }

    // mock
    return of(true).pipe(tap(success => {
      if (success) {
        this.refreshDetails();
      }
    }));
  }
}
