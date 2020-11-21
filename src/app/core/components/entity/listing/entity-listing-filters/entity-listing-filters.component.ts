import { Component, OnInit } from '@angular/core';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

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
    private listingContext: ListingContextService
  ) { 
    this.model.searchText = listingContext.searchText$.value;
  }

  ngOnInit() {
  }

  updateFilter() {    
    this.listingContext.setSearchText(this.model.searchText);
  }
}
