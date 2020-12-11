import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCreateContextService } from '../create/entity-create-context.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEntityCreateComponent implements OnInit, OnDestroy {

  // model
  model : any = {};  

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private context: EntityCreateContextService    
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

