import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example-create',
  templateUrl: './example-create.component.html',
  styleUrls: ['./example-create.component.scss']
})
export class ExampleCreateComponent implements OnInit, OnDestroy {
  
  // model
  model : any = {};  

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private context: EntityCreateContextService,
    private router: Router
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
