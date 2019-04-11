import { Component, OnInit } from '@angular/core';
import { WorkflowContextService } from '../../services/workflow/workflow-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workflow-history-list',
  templateUrl: './workflow-history-list.component.html',
  styleUrls: ['./workflow-history-list.component.scss']
})
export class WorkflowHistoryListComponent implements OnInit {

  // observables
  list$: Observable<any>;

  // new
  constructor(
    private context: WorkflowContextService
  ) { 
    this.list$ = context.history$;
  }

  // init
  ngOnInit() {
  }

}
