import { Component, OnInit } from '@angular/core';
import { AdminBillingDetailsContextService } from '../../services/admin-billing-details-context.service';

@Component({
  selector: 'app-admin-billing-details',
  templateUrl: './admin-billing-details.component.html',
  styleUrls: ['./admin-billing-details.component.sass']
})
export class AdminBillingDetailsComponent implements OnInit {

  // state
  details$ = this.context.details$;
  busy$ = this.context.busy$;

  // new
  constructor(
    private context: AdminBillingDetailsContextService
  ) { }

  // init
  ngOnInit(): void {

    // refresh
    this.context.refreshDetails();
  }

  // update
  update(model: any) {
    this.context.updateDetails(model).subscribe();
  }

}
