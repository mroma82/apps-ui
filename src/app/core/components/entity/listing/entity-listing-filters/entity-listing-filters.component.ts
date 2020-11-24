import { Component, Inject, OnInit } from '@angular/core';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-filters',
  templateUrl: './entity-listing-filters.component.html',
  styleUrls: ['./entity-listing-filters.component.scss']
})
export class EntityListingFiltersComponent implements OnInit {

  // model
  model = { 
    searchText: null
  };

  // new
  constructor(
    @Inject("IEntityListingContextService") private listingContext: EntityListingContextService
  ) { 
    this.model.searchText = listingContext.searchText$.value;
  }

  ngOnInit() {
  }

  updateFilter() {    
    this.listingContext.setSearchText(this.model.searchText);
  }
}
