import { Component, OnInit } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';

@Component({
  selector: 'app-workflow-reset',
  templateUrl: './workflow-reset.component.html',
  styleUrls: ['./workflow-reset.component.scss']
})
export class WorkflowResetComponent implements OnInit {

  // new
  constructor(
    private context: WorkflowContextService
  ) { }

  ngOnInit() {
  }

  // reset 
  reset() {
    
    // reset
    let instance = this.context.instance$.value;
    this.context.reset(instance.id, instance.currentTaskId);
    this.context.closeResetDialog();
  }

  // cancel
  cancel() {
    this.context.closeResetDialog();
  }
}
