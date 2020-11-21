import { Component, OnInit } from '@angular/core';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';
import { EntityCreateContextService } from 'src/app/core/entity/create/entity-create-context.service';

@Component({
  selector: 'app-entity-listing-page-generic',
  templateUrl: './entity-listing-page-generic.component.html',
  styleUrls: ['./entity-listing-page-generic.component.scss']
})
export class EntityListingPageGenericComponent implements OnInit {

  constructor(
    private listingContext : ListingContextService,
    private createContext : EntityCreateContextService
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

  // create
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
