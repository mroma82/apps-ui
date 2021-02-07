import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntitySingleRecordViewEditContextService } from '../single-record/entity-single-record-view-edit-context.service';

@Directive()
export abstract class BaseEntitySingleRecordViewEditComponent implements OnInit {

   // define state
  model$ : Observable<any> = this.context.model$;

  // new
  constructor(
    private context : EntitySingleRecordViewEditContextService,    
  ) {         
  }

  ngOnInit() {
  }
}