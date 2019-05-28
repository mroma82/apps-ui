import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { PurchaseReqViewEditContextService } from '../../../services/purchase-req-view-edit-context.service';
import { PurchaseReqListsService } from '../../../services/purchase-req-lists.service';

@Component({
  selector: 'app-purchase-req-line',
  templateUrl: './purchase-req-line.component.html',
  styleUrls: ['./purchase-req-line.component.scss']
})
export class PurchaseReqLineComponent implements OnInit {
  @Input() viewMode : boolean;

  // lists  
  locationList$ : Observable<any>;    
  
  // model
  viewModel = {
    quantity: 0,
    unitPrice: 0,
    extPrice: 0
  };

  // subscriptions
  onModelChange$ : Subscription;  

  // new
  constructor(
    private context: PurchaseReqViewEditContextService,
    private lists: PurchaseReqListsService
  ) {     
    
  }
  
  // init
  ngOnInit() {    
    
    // subscribe to model changes
    this.onModelChange$ =
      this.context.lineDialogModel$.subscribe(x => {        
        if(x) {          
          this.viewModel = x;                  
        }
      });       

    // lists
    this.locationList$ = this.lists.locationList$;    
  }

  // destroy
  ngOnDestroy() {    
    this.onModelChange$.unsubscribe;
  }

  // save line
  saveLine() {
    this.context.addUpdateLine(this.viewModel);
  }

  // update ext price
  updateExtPrice() {
    this.viewModel.extPrice = this.viewModel.quantity * this.viewModel.unitPrice;
  }
}
