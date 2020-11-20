import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

@Component({
  selector: 'app-listing-results',
  templateUrl: './listing-results.component.html',
  styleUrls: ['./listing-results.component.scss']
})
export class ListingResultsComponent implements OnInit {

  listItems$ : Observable<any[]> = this.context.listItems$;
  columns$ : Observable<any[]> = this.config.getColumns();
  
  constructor(
    private context : ListingContextService,
    @Inject("IListingConfigurationService") private config : IListingConfigurationService
  ) { }

  ngOnInit() {
  }

}
