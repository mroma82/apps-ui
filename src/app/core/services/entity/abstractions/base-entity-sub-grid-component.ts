import { OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntitySubGridConfigurationService } from '../sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridViewEditContextService } from '../sub-grid/entity-sub-grid-view-edit-context.service';
import { EntityViewEditContextService } from '../view-edit/entity-view-edit-context.service';

export abstract class BaseEntitySubGridComponent implements OnInit {

  // state
  viewMode$ : Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$ : Observable<any> = this.context.entityRecord$;
  mode$ : Observable<'view' | 'edit'> = this.context.mode$;
  
  // entity type
  abstract entityTypeId : string;
  
  // sub grid config
  abstract subGridConfig : IEntitySubGridConfigurationService;

  // columns
  abstract subGridColumns : IEntityListingColumn[];
 
  // new
  constructor(
    private context: EntityViewEditContextService    
  ) { }

  // on init
  ngOnInit() {
  }
}
  