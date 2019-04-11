import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';

@Component({
  selector: 'app-workflow-history-list-dialog',
  templateUrl: './workflow-history-list-dialog.component.html',
  styleUrls: ['./workflow-history-list-dialog.component.scss']
})
export class WorkflowHistoryListDialogComponent extends BaseDialog implements OnInit {

  // new
  constructor(
    modalService: NgbModal,
    private context: WorkflowContextService
  ) {
    super(modalService);

    // open/close subscription
    this.initOpenCloseSubscription(context.historyDialogOpenClose$);
  }

  ngOnInit() {
    
  }
}

