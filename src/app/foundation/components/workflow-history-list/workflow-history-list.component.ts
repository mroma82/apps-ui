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

  // transition icon class
  getTransitionIconCssClass(item: any): string {

    // check the transition type
    switch (item.transitionType) {
      case 10: return "fas fa-thumbs-up text-success";
      case 11: return "fas fa-paper-plane";
      case 20: return "fas fa-reply text-danger";
      case 21: return "fas fa-question";
      case 22: return "fas fa-history";
      case 30: return "fas fa-ban text-danger";
      case 31: return "fas fa-ban";
      case 32: return "fas fa-ban";
      case 33: return "fas fa-check text-success";
    }
  }
}
