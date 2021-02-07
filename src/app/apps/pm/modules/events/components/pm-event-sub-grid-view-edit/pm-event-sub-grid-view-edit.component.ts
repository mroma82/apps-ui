import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-pm-event-sub-grid-view-edit',
  templateUrl: './pm-event-sub-grid-view-edit.component.html',
  styleUrls: ['./pm-event-sub-grid-view-edit.component.sass']
})
export class PmEventSubGridViewEditComponent implements OnInit {

  // model
  model : any = {};  

  // options
  mode$ : Observable<'view' | 'edit'> = this.context.mode$;

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
