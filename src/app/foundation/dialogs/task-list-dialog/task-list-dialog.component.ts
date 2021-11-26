import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationContextService } from '../../services/notification/notification-context.service';
import { TaskContextService } from '../../services/task/task-context.service';

@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html',
  styleUrls: ['./task-list-dialog.component.scss']
})
export class TaskListDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: TaskContextService
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