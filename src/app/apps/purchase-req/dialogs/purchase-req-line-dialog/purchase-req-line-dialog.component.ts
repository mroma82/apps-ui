import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseReqViewEditContextService } from '../../services/purchase-req-view-edit-context.service';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';

@Component({
  selector: 'app-purchase-req-line-dialog',
  templateUrl: './purchase-req-line-dialog.component.html',
  styleUrls: ['./purchase-req-line-dialog.component.scss']
})
export class PurchaseReqLineDialogComponent extends BaseDialog {
  @Input() viewMode: boolean;
  
  constructor(
    modelService: NgbModal,
    context: PurchaseReqViewEditContextService
  ) { 
    super(modelService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.lineDialogOpen$);
  }

  ngOnInit() {
  }
}
