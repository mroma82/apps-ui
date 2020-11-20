import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntityViewEditContextService } from 'src/app/common/services/entity/view-edit/entity-view-edit-context.service';
import { ExampleListsService } from '../../services/example-lists.service';
import { ExampleViewEditContextService } from '../../services/example-view-edit-context.service';

@Component({
  selector: 'app-example-view-edit',
  templateUrl: './example-view-edit.component.html',
  styleUrls: ['./example-view-edit.component.scss']
})
export class ExampleViewEditComponent implements OnInit {
  
  // state
  viewMode : boolean;
  
  // lists
  statusList$ : Observable<any>;  
  statusValueList$ : Observable<any>;  
  userList$ : Observable<any>;

  // model
  viewModel : any = {
    record: { 
      customerId: "",
      customerName: ""     
    }
  };

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private context: EntityViewEditContextService,
    private lists: ExampleListsService    
  ) {     
    // lists
    this.statusList$ = lists.userList$
    this.statusValueList$ = lists.statusValueList$;
    this.userList$ = lists.userList$;
    this.viewMode = context.mode$.value == "view";
  }
  
  // init
  ngOnInit() {    

    // subscribe to record changes
    this.subs.add(
      this.context.entityRecord$.subscribe(x => {        
        if(x) {          
          this.viewModel.record = x;                  
        }
      })
    );       
  }

  // destroy
  ngOnDestroy() {    
    this.subs.unsubscribe();
  }

  // select
  setCustomer(customer) {
    this.viewModel.record.customerId = customer.customerId;
    this.viewModel.record.customerName = customer.customerName;
  }
}
