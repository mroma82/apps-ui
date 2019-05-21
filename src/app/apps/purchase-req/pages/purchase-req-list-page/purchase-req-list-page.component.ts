import { Component, OnInit } from '@angular/core';
import { PurchaseReqCreateContextService } from '../../services/purchase-req-create-context.service';
import { PurchaseReqListContextService } from '../../services/purchase-req-list-context.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-req-list-page',
  templateUrl: './purchase-req-list-page.component.html',
  styleUrls: ['./purchase-req-list-page.component.scss'],
  providers: [PurchaseReqCreateContextService]
})
export class PurchaseReqListPageComponent implements OnInit {

  constructor(
    private createContext : PurchaseReqCreateContextService,
    private context: PurchaseReqListContextService,
    private activatedRoute: ActivatedRoute
  ) { }

  // init
  ngOnInit() {
    
    // set the list type
    this.context.setListType(+this.activatedRoute.snapshot.data.listType);    
    this.context.setListFilterType(+this.activatedRoute.snapshot.data.listFilterType);    
  }

  // open create dialog
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
