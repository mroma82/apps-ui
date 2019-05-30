import { Component, OnInit } from '@angular/core';
import { PurchaseReqCreateContextService } from '../../services/purchase-req-create-context.service';
import { PurchaseReqListContextService } from '../../services/purchase-req-list-context.service';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-purchase-req-list-page',
  templateUrl: './purchase-req-list-page.component.html',
  styleUrls: ['./purchase-req-list-page.component.scss'],
  providers: [PurchaseReqCreateContextService]
})
export class PurchaseReqListPageComponent implements OnInit {

  // types
  listType: number;
  listFilterType: number;

  // new
  constructor(
    private createContext : PurchaseReqCreateContextService,
    private context: PurchaseReqListContextService,
    private activatedRoute: ActivatedRoute,
    private appContext: AppContextService
  ) { }

  // init
  ngOnInit() {
        
    // set the list type
    this.listType = +this.activatedRoute.snapshot.data.listType;
    this.context.setListType(this.listType);
    
    // set filter type
    this.listFilterType = +this.activatedRoute.snapshot.data.listFilterType;
    this.context.setListFilterType(this.listFilterType);    
    
    // build title
    let title = "Purchase Requisitions";
    if(this.listType == 0)
    {
      switch(this.listFilterType)
      { 
        case 1: title = "Purchase Requisitions - All"; break;
        case 2: title = "Purchase Requisitions - My Tasks"; break;
      }
    }

    // templates
    else if(this.listType == 1)
    {
      switch(this.listFilterType)
      { 
        case 0: title = "Purchase Requisitions - My Templates"; break;
        case 1: title = "Purchase Requisitions - All Templates"; break;        
      }
    }

    // set title
    this.appContext.Layout.setTitle(title);
  }

  // open create dialog
  openCreateDialog() {

    // set type and open dialog
    this.createContext.isTemplate$.next(this.listType == 1);
    this.createContext.openDialog();
  }
}
