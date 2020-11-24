import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-results',
  templateUrl: './entity-listing-results.component.html',
  styleUrls: ['./entity-listing-results.component.scss']
})
export class EntityListingResultsComponent implements OnInit {

  listItems$ : Observable<any[]> = this.context.listItems$;
  columns$ : Observable<any[]> = this.config.getColumns();
  pageSize$ : Observable<number> = this.context.pageSize$;
  
  constructor(
    @Inject("IEntityListingContextService") private context : EntityListingContextService,
    @Inject("IEntityListingConfigurationService") private config : IEntityListingConfigurationService
  ) { }

  ngOnInit() {
  }

  // on page
  onPage(e) {
    this.context.setPage(e.offset + 1);    
  }

  onSort(e) {      
    if(e.sorts.length) {
      this.context.setSort({
        field: e.sorts[0].prop,
        isDescending: e.sorts[0].dir === "desc"
      })
    }
  }

}
