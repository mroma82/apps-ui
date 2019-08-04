import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminWorkflowGroupListContextService } from '../../../services/workflow-groups/admin-workflow-group-list-context.service';

@Component({
  selector: 'app-admin-workflow-group-list',
  templateUrl: './admin-workflow-group-list.component.html',
  styleUrls: ['./admin-workflow-group-list.component.scss']
})
export class AdminWorkflowGroupListComponent implements OnInit {

  // observables
  workflowGroupList$ : Observable<any>;

  // new
  constructor(
    private context: AdminWorkflowGroupListContextService
  ) { 
    // set observables
    this.workflowGroupList$ = this.context.list$;
  }

  // init
  ngOnInit() {
  }

}
