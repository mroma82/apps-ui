import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-filters',
  templateUrl: './entity-listing-filters.component.html',
  styleUrls: ['./entity-listing-filters.component.scss']
})
export class EntityListingFiltersComponent implements OnInit, OnDestroy {

  // model
  model = { 
    searchText: null
  };

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private listingContext: EntityListingContextService
  ) { 

    // list
    this.subs.add(
      listingContext.searchText$.subscribe(x => this.model.searchText = x)
    );
  }

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // update
  updateFilter() {    
    this.listingContext.setSearchText(this.model.searchText);
  }
}
