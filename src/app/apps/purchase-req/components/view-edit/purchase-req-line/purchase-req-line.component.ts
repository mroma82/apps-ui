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
  ledgerList$ : Observable<any>;
  departmentList$ : Observable<any>;
  
  // model
  viewModel : any = {
    itemType : 0,
    quantity: 0,
    unitPrice: 0,
    extPrice: 0,
    itemId: "",
    itemDescription: ""
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
    this.ledgerList$ = this.lists.ledgerList$;
    this.departmentList$ = this.lists.departmentList$;
  }

  // destroy
  ngOnDestroy() {    
    this.onModelChange$.unsubscribe;
  }

  // save line
  saveLine() {
    this.context.addUpdateLine(this.viewModel);
  }

  // set item
  setItem(item: any) {
    this.viewModel.itemId = item.itemId;
    this.viewModel.itemDescription = item.itemName
    
    // set price
    this.viewModel.unitPrice = item.unitPrice;
    this.updateExtPrice();
  }

  // update ext price
  updateExtPrice() {
    this.viewModel.extPrice = this.viewModel.quantity * this.viewModel.unitPrice;
  }

  // handle item type change
  onItemTypeChange() {

    // inventory
    if(this.viewModel.itemType == 0) {

        // clear item id on change to inventory item
        this.viewModel.itemId = "";     
    }

    // non-inventory
    else if(this.viewModel.itemType == 1) {

      // clear ledger account
      this.viewModel.ledgerAccount = "";
    } 
  }
}
