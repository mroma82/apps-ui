import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { AuditTrailDialogContextService } from '../../services/audit-trail/audit-trail-dialog-context.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-audit-trail-list-dialog',
  templateUrl: './audit-trail-list-dialog.component.html',
  styleUrls: ['./audit-trail-list-dialog.component.scss']
})
export class AuditTrailListDialogComponent extends BaseDialog implements OnInit {

  // obserables
  list$ : Observable<any>;
  detailList$ : Observable<any>;

  // state
  currentItemId: string;

  // new
  constructor(
    modalService: NgbModal,
    private context: AuditTrailDialogContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.dialogOpenClose$);
  }

  ngOnInit() {
    
    // set
    this.list$ = this.context.list$;
    this.detailList$ = this.context.detailList$;
  }

  // set item
  setItem(item: any) {
    this.currentItemId = item.id;

    // refresh details
    this.context.refreshDetailList(item.id);
  }

}
