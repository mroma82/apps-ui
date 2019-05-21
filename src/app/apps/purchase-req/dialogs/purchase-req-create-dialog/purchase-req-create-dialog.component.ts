import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseReqCreateContextService } from '../../services/purchase-req-create-context.service';

@Component({
  selector: 'app-purchase-req-create-dialog',
  templateUrl: './purchase-req-create-dialog.component.html',
  styleUrls: ['./purchase-req-create-dialog.component.scss']
})
export class PurchaseReqCreateDialogComponent extends BaseDialog {

  constructor(
    modelService: NgbModal,
    context: PurchaseReqCreateContextService
  ) { 
    super(modelService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }

  ngOnInit() {
  }

}