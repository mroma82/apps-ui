import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

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
    @Inject("IEntityListingConfigurationService") private listingConfig : IEntityListingConfigurationService,
    private listingContext : EntityListingContextService
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
