import { Component, OnInit } from '@angular/core';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

@Component({
  selector: 'app-listing-page-generic',
  templateUrl: './listing-page-generic.component.html',
  styleUrls: ['./listing-page-generic.component.scss']
})
export class ListingPageGenericComponent implements OnInit {

  constructor(
    private listingContext : ListingContextService
  ) { }

  ngOnInit() {

    // refresh on load
    this.refresh();
  }

  // refresh
  refresh() {
    this.listingContext.refreshData();
  }

  setPageSize(pageSize: number) {
    this.listingContext.pageSize$.next(pageSize);
  }

}
