import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { ExampleListsService } from '../../services/example-lists.service';
import { ExampleLineCreateComponent } from '../example-line-create/example-line-create.component';
import { ExampleLineViewEditComponent } from '../example-line-view-edit/example-line-view-edit.component';


@Component({
  selector: 'app-example-view-edit-form',
  templateUrl: './example-view-edit-form.component.html',
  styleUrls: ['./example-view-edit-form.component.scss']
})
export class ExampleViewEditFormComponent implements OnInit {
  
    
  // lists
  statusList$ : Observable<any>;  
  statusValueList$ : Observable<any>;  
  userList$ : Observable<any>;

  // state
  viewMode$ : Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

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
