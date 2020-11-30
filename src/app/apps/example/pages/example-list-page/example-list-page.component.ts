import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { ActivatedRoute } from '@angular/router';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example-list-page',
  templateUrl: './example-list-page.component.html',
  styleUrls: ['./example-list-page.component.scss']  
})
export class ExampleListPageComponent implements OnInit, OnDestroy {

  constructor(
    private appContext: AppContextService,        
    private route: ActivatedRoute,
    private listContext : EntityListingContextService
  ) {     
    // title
    appContext.Layout.setTitle(null);
  }

  // subscriptions
  subs = new Subscription();

  // init
  ngOnInit() {

    // subscribe to route changes
    this.subs.add(
      this.route.data.subscribe(x => this.listContext.setIsWorkflowAssigned(x.isWorkflowAssigned))    
    );    
  }  

  // cleanup
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
