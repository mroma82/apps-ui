import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';
import { ListingContextService } from 'src/app/common/services/entity/listing-context.service';

@Component({
  selector: 'app-listing-views',
  templateUrl: './listing-views.component.html',
  styleUrls: ['./listing-views.component.scss']
})
export class ListingViewsComponent implements OnInit {

  // state
  selectedView$ : Observable<any> = this.listingContext.view$;
  views$ : Observable<any[]> = this.listingConfig.getViews();

  state = {
    showChange: false
  };

  constructor(
    private listingConfig : ListingConfigurationService,
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
