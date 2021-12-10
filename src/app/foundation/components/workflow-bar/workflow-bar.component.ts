import { Component, OnInit, Input } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workflow-bar',
  templateUrl: './workflow-bar.component.html',
  styleUrls: ['./workflow-bar.component.scss'],
  providers: [WorkflowContextService]
})
export class WorkflowBarComponent implements OnInit {
  @Input() entityTypeId: string;
  @Input() entityId: string;
  @Input() workflowUrl: string;
  @Input() prefixText: string;

  // observables
  busy$: Observable<boolean>;
  instance$: Observable<any>;
  actions$: Observable<any>;
  assigned$: Observable<any>;


  constructor(
    private context: WorkflowContextService
  ) {
    this.instance$ = context.instance$;
    this.actions$ = context.actions$;
    this.assigned$ = context.assigned$;
    this.busy$ = context.busy$;
  }

  // init
  ngOnInit() {

    // options 
    this.context.setOptions({
      url: this.workflowUrl
    });

    // context
    this.context.setEntity({
      entityId: this.entityId,
      entityTypeId: this.entityTypeId
    });
  }

  getAssignedTo(instance: any) {
    let assignedTo = instance.currentAssigned;
    if (assignedTo.indexOf("_") > -1) {
      return assignedTo.substring(assignedTo.indexOf("_") + 1)
    } else {
      return assignedTo;
    }
  }

  // show the assigned list dialog
  showAssigned() {
    this.context.openAssignedDialog();
  }

  // show history dialog
  showHistory() {
    this.context.openHistoryDialog();
  }

  // advance
  advance(instance: any, action: any) {
    this.context.advance(instance.id, {
      currentTaskId: instance.currentTaskId,
      routeOption: action.routeOption
    });
  }

  // reject
  reject() {
    this.context.openRejectDialog();
  }

  // reset
  reset() {
    this.context.reset();
  }

  // cancel
  cancel() {
    this.context.cancel();
  }

  // regenerate
  regenerate() {
    this.context.regenerate();
  }

  // refresh
  refresh() {
    this.context.refreshInstance();
  }

  // action icon
  getActionIcon(action: { actionDescription: string }) {

    // check special cases
    switch (action.actionDescription.toLowerCase()) {

      // approve
      case "approve":
        return "fas fa-thumbs-up";

      // deny
      case "deny":
      case "denied":
        return "fas fa-ban";

      // submit
      case "submit":
        return "fas fa-paper-plane";

      // default
      default:
        return "fas fa-check";
    }
  }
}
