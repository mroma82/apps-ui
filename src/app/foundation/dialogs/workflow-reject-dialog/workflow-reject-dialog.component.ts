import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';

@Component({
  selector: 'app-workflow-reject-dialog',
  templateUrl: './workflow-reject-dialog.component.html',
  styleUrls: ['./workflow-reject-dialog.component.scss']
})
export class WorkflowRejectDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: WorkflowContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.rejectDialogOpenClose$);
  }

  ngOnInit() {
    
  }
}
