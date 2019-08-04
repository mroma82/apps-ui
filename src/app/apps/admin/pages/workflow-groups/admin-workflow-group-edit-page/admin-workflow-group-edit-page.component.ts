import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminWorkflowGroupEditContextService } from '../../../services/workflow-groups/admin-workflow-group-edit-context.service';

@Component({
  selector: 'app-admin-workflow-group-edit-page',
  templateUrl: './admin-workflow-group-edit-page.component.html',
  styleUrls: ['./admin-workflow-group-edit-page.component.scss'],
  providers: [AdminWorkflowGroupEditContextService]
})
export class AdminWorkflowGroupEditPageComponent implements OnInit, OnDestroy {

  // subscriptions
  onRouteChange$ : Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private context: AdminWorkflowGroupEditContextService
  ) { 
    
    // route change
    this.onRouteChange$ = this.activatedRoute.paramMap.subscribe(x => {
      this.context.setId(x.get("id"));
    });      
  }

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy() {
    this.onRouteChange$.unsubscribe();
  }

}
