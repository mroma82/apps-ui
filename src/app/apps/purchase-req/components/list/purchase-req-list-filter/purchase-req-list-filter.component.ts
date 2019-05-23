import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseReqListContextService } from '../../../services/purchase-req-list-context.service';
import { Subscription, Observable } from 'rxjs';
import { PurchaseReqListsService } from '../../../services/purchase-req-lists.service';

@Component({
  selector: 'app-purchase-req-list-filter',
  templateUrl: './purchase-req-list-filter.component.html',
  styleUrls: ['./purchase-req-list-filter.component.scss']
})
export class PurchaseReqListFilterComponent implements OnInit, OnDestroy {

  // define model
  model : {
    searchText: ""
  };

  // lists
  statusList$ : Observable<any>;
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;

  // subscriptions
  onFilterChange$ : Subscription;

  // new
  constructor(
    private context: PurchaseReqListContextService,
    private lists: PurchaseReqListsService
  ) { }

  // init
  ngOnInit() {

    // set filter on change
    this.onFilterChange$ = this.context.filter$.subscribe(x => this.model = x);

    // lists
    this.statusList$ = this.lists.statusList$;
    this.buyerGroupList$ = this.lists.buyerGroupList$;
    this.userList$ = this.lists.userList$;
  }

  // clean up
  ngOnDestroy() {
    this.onFilterChange$.unsubscribe();
  }

  // update filter
  updateFilter() {
    this.context.setFilter(this.model);
  }

}