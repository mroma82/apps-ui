import { Component, Inject, OnInit } from '@angular/core';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-page-generic',
  templateUrl: './entity-listing-page-generic.component.html',
  styleUrls: ['./entity-listing-page-generic.component.scss']
})
export class EntityListingPageGenericComponent implements OnInit {

  constructor(
    @Inject("IEntityListingContextService") private listingContext : EntityListingContextService,
    @Inject("IEntityCreateContextService") private createContext : EntityCreateContextService
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
