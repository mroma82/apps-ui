import { Component, OnInit } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workflow-assigned-list',
  templateUrl: './workflow-assigned-list.component.html',
  styleUrls: ['./workflow-assigned-list.component.scss']
})
export class WorkflowAssignedListComponent implements OnInit {

  // observables
  list$ : Observable<any>;

  // new
  constructor(
    private context: WorkflowContextService
  ) { 
    this.list$ = context.assigned$;
  }

  // init
  ngOnInit() {
  }

}
