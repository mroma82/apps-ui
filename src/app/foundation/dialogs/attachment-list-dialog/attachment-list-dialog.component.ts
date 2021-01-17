import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';

@Component({
  selector: 'app-attachment-list-dialog',
  templateUrl: './attachment-list-dialog.component.html',
  styleUrls: ['./attachment-list-dialog.component.scss']
})
export class AttachmentListDialogComponent extends BaseDialog implements OnInit {

  // mode
  mode$: Observable<string>;
  
  // new
  constructor(
    modalService: NgbModal,
    private context: AttachmentDialogContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.dialogOpenClose$);
  }

  // add
  add() {
    this.context.setDialogMode("add");
  }

  ngOnInit() {
     this.mode$ = this.context.dialogMode$;
  }

  // dismiss
  dismiss() {
    this.context.dialogOpenClose$.next(false);
  }
}