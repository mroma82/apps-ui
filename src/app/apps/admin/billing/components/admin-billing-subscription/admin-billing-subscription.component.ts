import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../common/services/dialog.service';
import { DialogResultEnum } from '../../../../../common/types/dialogs/dialog-result.enum';
import { AdminBillingSubscriptionContextService } from '../../services/admin-billing-subscription-context.service';

@Component({
  selector: 'app-admin-billing-subscription',
  templateUrl: './admin-billing-subscription.component.html',
  styleUrls: ['./admin-billing-subscription.component.sass']
})
export class AdminBillingSubscriptionComponent implements OnInit {

  // state
  subscription$ = this.context.subscription$;
  products$ = this.context.products$;
  busy$ = this.context.busy$;

  // new
  constructor(
    private context: AdminBillingSubscriptionContextService,
    private dialog: DialogService
  ) { }

  // init
  ngOnInit(): void {
    this.context.refreshData();
  }

  // update product
  updateProductId(productId: string) {

    // ask first
    this.dialog.yesNo("Subscription", "Are you sure you want to update your subscription?").subscribe(x => {
      if (x == DialogResultEnum.Yes) {

        // update
        this.context.updateProductId(productId).subscribe();;
      }
    })
  }

  // update license count
  updateLicenseCount(licenseCount: number) {

    // ask first
    this.dialog.yesNo("Subscription", "Are you sure you want to update your license count?").subscribe(x => {
      if (x == DialogResultEnum.Yes) {

        // update
        this.context.updateLicenseCount(licenseCount).subscribe();
      }
    })
  }
}
