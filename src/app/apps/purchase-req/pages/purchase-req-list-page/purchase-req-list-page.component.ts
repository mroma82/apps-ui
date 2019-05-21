import { Component, OnInit } from '@angular/core';
import { PurchaseReqCreateContextService } from '../../services/purchase-req-create-context.service';
import { PurchaseReqListContextService } from '../../services/purchase-req-list-context.service';

@Component({
  selector: 'app-purchase-req-list-page',
  templateUrl: './purchase-req-list-page.component.html',
  styleUrls: ['./purchase-req-list-page.component.scss'],
  providers: [PurchaseReqCreateContextService]
})
export class PurchaseReqListPageComponent implements OnInit {

  constructor(
    private createContext : PurchaseReqCreateContextService,
    private context: PurchaseReqListContextService
  ) { }

  // init
  ngOnInit() {
    this.context.refreshData();
  }

  // open create dialog
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
