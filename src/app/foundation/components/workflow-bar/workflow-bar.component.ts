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
  @Input() contextType: number;
  @Input() contextId: string;
  @Input() workflowUrl: string;
  @Input() prefixText: string;

  // observables
  busy$: Observable<boolean>;
  instance$ : Observable<any>;
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
    this.context.setContext({
      contextId: this.contextId,
      contextType: this.contextType
    });
  }

  getAssignedTo(instance: any) {
    let assignedTo = instance.currentAssigned;
    if(assignedTo.indexOf("_") > -1) {
      return assignedTo.substring(assignedTo.indexOf("_") + 1)
    } else {
      return assignedTo;
    }
  }

  // show the assigned list dialog
  showAssignedListDialog() {
    this.context.openAssignedDialog();
  }

  // advance
  advance(instance: any, action: any) {
    this.context.advance(instance.id, { 
      currentTaskId: instance.currentTaskId,
      routeOption: action.routeOption
    });
  }

  // reject
  reject(instance: any) {
    this.context.reject(instance.id, instance.currentTaskId);
  }

  // reset
  reset(instance: any) {
    this.context.reset(instance.id, instance.currentTaskId);
  }
}
