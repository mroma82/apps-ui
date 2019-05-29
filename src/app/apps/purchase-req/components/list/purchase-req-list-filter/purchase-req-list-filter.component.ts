import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PurchaseReqListContextService } from '../../../services/purchase-req-list-context.service';
import { Subscription, Observable } from 'rxjs';
import { PurchaseReqListsService } from '../../../services/purchase-req-lists.service';
import { ListingControlsComponent } from 'src/app/common/components/listing/listing-controls/listing-controls.component';

@Component({
  selector: 'app-purchase-req-list-filter',
  templateUrl: './purchase-req-list-filter.component.html',
  styleUrls: ['./purchase-req-list-filter.component.scss']
})
export class PurchaseReqListFilterComponent implements OnInit, OnDestroy {
  @ViewChild("listingControls") listingControls : ListingControlsComponent

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

    // set initial page
    this.listingControls.initModel({
      pageSize: this.context.pageSize$.value
    });

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

  // refresh
  refresh() {
    this.context.refreshData();
  }

  // set page size
  setPageSize(pageSize: number) {
    this.context.setPageSize(pageSize);
  }
}
