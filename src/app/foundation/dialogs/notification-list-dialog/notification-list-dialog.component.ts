import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationContextService } from '../../services/notification/notification-context.service';

@Component({
  selector: 'app-notification-list-dialog',
  templateUrl: './notification-list-dialog.component.html',
  styleUrls: ['./notification-list-dialog.component.scss']
})
export class NotificationListDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: NotificationContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.listDialogOpenClose$);
  }

  ngOnInit() {
    
  }

  // dismiss
  dismiss() {
    this.context.listDialogOpenClose$.next(false);
  }
}