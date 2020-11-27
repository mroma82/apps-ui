import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-example-line-view-edit',
  templateUrl: './example-line-view-edit.component.html',
  styleUrls: ['./example-line-view-edit.component.scss']
})
export class ExampleLineViewEditComponent implements OnInit, OnDestroy {

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
