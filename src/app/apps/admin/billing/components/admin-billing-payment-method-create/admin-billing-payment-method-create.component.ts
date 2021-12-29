import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminBillingPaymentMethodCreate } from '../../models/admin-billing-payment-method-create';
import { AdminBillingPaymentMethodCreateContextService } from '../../services/admin-billing-payment-method-create-context.service';

@Component({
  selector: 'app-admin-billing-payment-method-create',
  templateUrl: './admin-billing-payment-method-create.component.html',
  styleUrls: ['./admin-billing-payment-method-create.component.sass']
})
export class AdminBillingPaymentMethodCreateComponent implements OnInit {

  // define model
  model$ = this.context.model$.pipe(filter(x => x != null));

  // define lists
  yearList: number[] = [];

  // new
  constructor(
    private context: AdminBillingPaymentMethodCreateContextService
  ) {

    // init list

    let startYear = new Date().getFullYear();
    for (let year = 0; year < 20; year++) {
      this.yearList.push(startYear + year);
    }
  }

  ngOnInit(): void {

  }

  setPaymentMethod(type: number) { }
}
