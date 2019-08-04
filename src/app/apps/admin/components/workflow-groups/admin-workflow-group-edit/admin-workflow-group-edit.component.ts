import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { PermissionsContextService } from '../../../services/permissions/permissions-context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminWorkflowGroupEditContextService } from '../../../services/workflow-groups/admin-workflow-group-edit-context.service';

@Component({
  selector: 'app-admin-workflow-group-edit',
  templateUrl: './admin-workflow-group-edit.component.html',
  styleUrls: ['./admin-workflow-group-edit.component.scss']
})
export class AdminWorkflowGroupEditComponent implements OnInit {

  // observables
  id$ : Observable<string>;
  userList$ : Observable<any>;
  groupList$ : Observable<any>;

  // model
  model : any = {};

  // subscriptions
  onModelChange : Subscription;

  // new
  constructor(      
    private context: AdminWorkflowGroupEditContextService,  
    permissionsContext: PermissionsContextService,
    private router: Router
  ) { 
    
    // lists
    this.userList$ = permissionsContext.userList$;
    this.groupList$ = permissionsContext.groupList$;

    // model
    this.onModelChange = this.context.viewEditModel$.subscribe(model => this.model = model);
  }

  // set a user
  setUser(list : string[], user: any, e) {
    if(e.target.checked) {
      list.push(user.username);
    } else {
      list.splice(list.indexOf(user.username), 1);
    }
  }

  // set a group
  setGroup(list : string[], group: any, e) {
    if(e.target.checked) {
      list.push(group.name);
    } else {
      list.splice(list.indexOf(group.name), 1);
    }
  }

  // save
  save() {    
    this.context.update(this.model).subscribe(x => {      
      this.router.navigateByUrl("/app/admin/workflow-groups");
    });
  }

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy() {
    this.onModelChange.unsubscribe();
  }
}
