import { Component, OnInit } from '@angular/core';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

@Component({
  selector: 'app-listing-filters',
  templateUrl: './listing-filters.component.html',
  styleUrls: ['./listing-filters.component.scss']
})
export class ListingFiltersComponent implements OnInit {

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
