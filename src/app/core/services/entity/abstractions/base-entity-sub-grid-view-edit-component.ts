import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntitySubGridViewEditContextService } from '../sub-grid/entity-sub-grid-view-edit-context.service';

export abstract class BaseEntitySubGridViewEditComponent implements OnInit, OnDestroy {

    // model
    model : any = {};  
  
    // subscriptions
    subs = new Subscription();
  
    // new
    constructor(
      private context: EntitySubGridViewEditContextService    
    ) { 
  
      // sub to model
      this.context.model$.subscribe(x => this.model = x);
    }
  
    // init
    ngOnInit() {    
    }
  
    // cleanup
    ngOnDestroy() {
      this.subs.unsubscribe();
    }
  }
  