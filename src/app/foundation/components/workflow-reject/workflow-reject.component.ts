import { Component, OnInit } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';

@Component({
  selector: 'app-workflow-reject',
  templateUrl: './workflow-reject.component.html',
  styleUrls: ['./workflow-reject.component.scss']
})
export class WorkflowRejectComponent implements OnInit {

  // model
  model = {
    rejectReason: ""
  };

  // state
  state = {
    hasErrors: false,
    errorText: ""
  };

  // new
  constructor(
    private context: WorkflowContextService
  ) { }

  ngOnInit() {
  }

  // reject 
  reject() {

    // clear
    this.state.hasErrors = false;
    this.state.errorText = "";

    // check if a rason
    if(!this.model.rejectReason) {
      this.state.hasErrors = true;
      this.state.errorText = "A reason for reject is required";
      return;
    }

    // reject
    let instance = this.context.instance$.value;
    this.context.reject(instance.id, instance.currentTaskId, this.model.rejectReason);
    this.context.closeRejectDialog();
  }
}
