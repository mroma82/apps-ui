import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PurchaseReqViewEditContextService } from '../../../services/purchase-req-view-edit-context.service';
import { PurchaseReqListsService } from '../../../services/purchase-req-lists.service';

@Component({
  selector: 'app-purchase-req-view-edit',
  templateUrl: './purchase-req-view-edit.component.html',
  styleUrls: ['./purchase-req-view-edit.component.scss']
})
export class PurchaseReqViewEditComponent implements OnInit {
  @Input() viewMode : boolean;

  // lists
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;
  projectList$ : Observable<any>;
  departmentList$ : Observable<any>;
  locationList$ : Observable<any>;  

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
    private context: PurchaseReqViewEditContextService,
    private lists: PurchaseReqListsService
  ) {     
    
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

    // lists
    this.userList$ = this.lists.userList$;    
    this.buyerGroupList$ = this.lists.buyerGroupList$;    
    this.projectList$ = this.lists.projectList$;    
    this.departmentList$ = this.lists.departmentList$;    
    this.locationList$ = this.lists.locationList$;    
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
