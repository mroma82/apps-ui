import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PurchaseReqViewEditContextService } from '../../../services/purchase-req-view-edit-context.service';
import { PurchaseReqListsService } from '../../../services/purchase-req-lists.service';

@Component({
  selector: 'app-purchase-req-view-edit',
  templateUrl: './purchase-req-view-edit.component.html',
  styleUrls: ['./purchase-req-view-edit.component.scss']
})
export class PurchaseReqViewEditComponent implements OnInit, OnDestroy {
  @Input() viewMode : boolean;

  // lists
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;
  projectList$ : Observable<any>;
  departmentList$ : Observable<any>;
  locationList$ : Observable<any>;  
  lineDialogOpen$ : Observable<any>;

  // model
  viewModel = {
    record: { 
      vendorId: ""      
    },
    lines: []
  };

  // subscriptions
  onRecordChange$ : Subscription;
  onLinesChange$ : Subscription;

  // new
  constructor(
    private context: PurchaseReqViewEditContextService,
    private lists: PurchaseReqListsService
  ) {     
    
  }
  
  // init
  ngOnInit() {    
this.lineDialogOpen$ = this.context.lineDialogOpen$;
    // subscribe to record changes
    this.onRecordChange$ =
      this.context.reqRecord$.subscribe(x => {        
        if(x) {          
          this.viewModel.record = x;                  
        }
      });       
      
    // subscribe to line changes
    this.onLinesChange$ = 
      this.context.reqLines$.subscribe(x => {
        if(x) {
          this.viewModel.lines = x;
        }
      })

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

  // add line
  addLine() {
    this.context.openLineDialogForCreate();
  }

  // edit line
  editLine(index: number, line: any) {
    this.context.openLineDialogForEdit(index, line);
  }
}
