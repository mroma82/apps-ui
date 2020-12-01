import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-example-list-filter',
  templateUrl: './example-list-filter.component.html',
  styleUrls: ['./example-list-filter.component.scss']
})
export class ExampleListFilterComponent implements OnInit, OnDestroy {  

  // model
  model = {
    status: null
  };
  
  // subs
  subs = new Subscription();  
  
  // new
  constructor(
    private context: EntityListingContextService
  ) {     
    // listen on filter change
    this.subs.add(this.context.filter$.subscribe(filter => {
      this.model = {
        status: filter.status ? filter.status : null
      };
    }));
  }

  // init
  ngOnInit() {          
  }

  // cleanup
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // update the filter
  updateFilter() {
    this.context.setFilter(this.model);
  }  
}
