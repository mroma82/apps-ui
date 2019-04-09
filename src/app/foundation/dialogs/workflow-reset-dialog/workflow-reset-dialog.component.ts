import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';

@Component({
  selector: 'app-workflow-reset-dialog',
  templateUrl: './workflow-reset-dialog.component.html',
  styleUrls: ['./workflow-reset-dialog.component.scss']
})
export class WorkflowResetDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: WorkflowContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.resetDialogOpenClose$);
  }

  ngOnInit() {
    
  }
}