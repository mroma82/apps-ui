import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-example-list-filter',
  templateUrl: './example-list-filter.component.html',
  styleUrls: ['./example-list-filter.component.scss']
})
export class ExampleListFilterComponent implements OnInit {
  //@ViewChild("listingControls") listingControls : ListingControlsComponent

  // model
  model: any = this.context.filter$.value
  
  // new
  constructor(
    private context: EntityListingContextService
  ) {     
  }

  // init
  ngOnInit() {
        
    /*this.listingControls.initModel({
      pageSize: this.context.pageSize$.value
    });*/
  }

  // update the filter
  updateFilter() {
    this.context.setFilter(this.model);
  }

  /*
  // refresh
  refresh() {
    this.context.refreshData();
  }

  // set page
  setPageSize(pageSize: number) {
    this.context.setPageSize(pageSize);
  }*/
}
