import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ExampleViewEditContextService } from '../../services/example-view-edit-context.service';

@Component({
  selector: 'app-example-view-edit',
  templateUrl: './example-view-edit.component.html',
  styleUrls: ['./example-view-edit.component.scss']
})
export class ExampleViewEditComponent implements OnInit {
  @Input() viewMode : boolean;

  // lists
  statusList$ : Observable<any>;  
  statusValueList$ : Observable<any>;  

  // model
  viewModel = {
    record: { 
      customerId: "",
      customerName: ""     
    }
  };

  // subscriptions
  subs: Subscription[] = [];

  // new
  constructor(
    private context: ExampleViewEditContextService    
  ) {     
    // lists
    this.statusList$ = context.statusList$;    
    this.statusValueList$ = context.statusValueList$;
  }
  
  // init
  ngOnInit() {    

    // subscribe to record changes
    this.subs.push(
      this.context.exampleRecord$.subscribe(x => {        
        if(x) {          
          this.viewModel.record = x;                  
        }
      })
    );       
  }

  // destroy
  ngOnDestroy() {
    // cleanup
    this.subs.forEach(x => x.unsubscribe());
  }

  // select
  setCustomer(customer) {
    this.viewModel.record.customerId = customer.customerId;
    this.viewModel.record.customerName = customer.customerName;
  }
}
