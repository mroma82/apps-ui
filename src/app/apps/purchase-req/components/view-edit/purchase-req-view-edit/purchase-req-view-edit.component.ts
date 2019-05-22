import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PurchaseReqViewEditContextService } from '../../../services/purchase-req-view-edit-context.service';

@Component({
  selector: 'app-purchase-req-view-edit',
  templateUrl: './purchase-req-view-edit.component.html',
  styleUrls: ['./purchase-req-view-edit.component.scss']
})
export class PurchaseReqViewEditComponent implements OnInit {
  @Input() viewMode : boolean;

  // lists
  statusList$ : Observable<any>;  

  // model
  viewModel = {
    record: { 
      vendorId: ""      
    }
  };

  // subscriptions
  onRecordChange$ : Subscription;

  // new
  constructor(
    private context: PurchaseReqViewEditContextService    
  ) {     
    // lists
    this.statusList$ = context.statusList$;    
  }
  
  // init
  ngOnInit() {    

    // subscribe to record changes
    this.onRecordChange$ =
      this.context.reqRecord$.subscribe(x => {        
        if(x) {          
          this.viewModel.record = x;                  
        }
      });           
  }

  // destroy
  ngOnDestroy() {    
    this.onRecordChange$.unsubscribe;
  }

  // select
  setCustomer(item) {
    this.viewModel.record.vendorId = item.vendorId;    
  }
}
