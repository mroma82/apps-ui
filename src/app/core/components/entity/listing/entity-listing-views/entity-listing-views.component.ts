import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

@Component({
  selector: 'app-entity-listing-views',
  templateUrl: './entity-listing-views.component.html',
  styleUrls: ['./entity-listing-views.component.scss']
})
export class EntityListingViewsComponent implements OnInit {

  // state
  selectedView$ : Observable<any> = this.listingContext.view$;
  views$ : Observable<any[]> = this.listingConfig.getViews();

  state = {
    showChange: false
  };

  constructor(
    @Inject("IListingConfigurationService") private listingConfig : IListingConfigurationService,
    private listingContext : ListingContextService
  ) { }

  ngOnInit() {
  }

  showChange() {
    this.state.showChange = true;
  }

  setView(view: any) {
    this.listingContext.setView(view);
    this.state.showChange = false;
  }

}
