import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { ENTITY_LISTING_CONFIG, IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';

@Component({
  selector: 'app-entity-listing-views',
  templateUrl: './entity-listing-views.component.html',
  styleUrls: ['./entity-listing-views.component.scss']
})
export class EntityListingViewsComponent implements OnInit {

  // state
  selectedView$ : Observable<any> = this.listingContext.view$;
  views$ : Observable<IEntityListingView[]> = this.listingConfig.getViews();

  // new
  constructor(
    @Inject(ENTITY_LISTING_CONFIG) private listingConfig : IEntityListingConfigurationService,
    private listingContext : EntityListingContextService
  ) { }

  ngOnInit() {
  }

  // set the view
  setView(view: any) {
    this.listingContext.setView(view);   
  }
}
