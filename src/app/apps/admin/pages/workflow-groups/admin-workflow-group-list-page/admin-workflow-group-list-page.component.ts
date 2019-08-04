import { Component, OnInit } from '@angular/core';
import { AdminWorkflowGroupListContextService } from '../../../services/workflow-groups/admin-workflow-group-list-context.service';

@Component({
  selector: 'app-admin-workflow-group-list-page',
  templateUrl: './admin-workflow-group-list-page.component.html',
  styleUrls: ['./admin-workflow-group-list-page.component.scss'],
  providers: [AdminWorkflowGroupListContextService]
})
export class AdminWorkflowGroupListPageComponent implements OnInit {

  // new
  constructor(
    private context: AdminWorkflowGroupListContextService
  ) { }

  // init
  ngOnInit() {

    // refresh
    this.context.refresh();
  }
}
