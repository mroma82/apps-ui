import { Component, OnInit } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';

@Component({
  selector: 'app-workflow-assigned-list-dialog',
  templateUrl: './workflow-assigned-list-dialog.component.html',
  styleUrls: ['./workflow-assigned-list-dialog.component.scss']
})
export class WorkflowAssignedListDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: WorkflowContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.assignedListDialogOpenClose$);

    // size
    this.dialogSize = "sm";
  }

  ngOnInit() {
    
  }

  // dismiss
  dismiss() {
    this.context.assignedListDialogOpenClose$.next(false);
  }
}
