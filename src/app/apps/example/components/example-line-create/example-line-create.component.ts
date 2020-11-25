import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-example-line-create',
  templateUrl: './example-line-create.component.html',
  styleUrls: ['./example-line-create.component.scss']
})
export class ExampleLineCreateComponent implements OnInit, OnDestroy {

  // model
  model : any = {};  

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    @Inject("IEntityCreateContextService") private context: EntityCreateContextService    
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
