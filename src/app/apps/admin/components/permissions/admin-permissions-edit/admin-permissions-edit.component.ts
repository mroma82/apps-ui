import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { PermissionsContextService } from '../../../services/permissions/permissions-context.service';

@Component({
  selector: 'app-admin-permissions-edit',
  templateUrl: './admin-permissions-edit.component.html',
  styleUrls: ['./admin-permissions-edit.component.scss']
})
export class AdminPermissionsEditComponent implements OnInit, OnDestroy {

  // observables
  id$ : Observable<string>;
  userList$ : Observable<any>;
  groupList$ : Observable<any>;

  // model
  model = {
    id: "",
    securityRole: "",
    allowedUsersList: [],
    allowedGroupsList: []
  };

  // subscriptions
  onObservableChanges : Subscription;

  // new
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private context: PermissionsContextService
  ) { 
    
    // lists
    this.userList$ = context.userList$;
    this.groupList$ = context.groupList$;

    // id
    this.onObservableChanges = combineLatest(
      this.activatedRoute.paramMap.pipe(map(x => x.get("key"))),
      this.context.permissions$
    ).subscribe((data) => {            
      let id = data[0];
      let roles = data[1];

      // find the rol
      let thisRole = roles.filter(perm => perm.id == id);
      if(thisRole.length > 0) {
        this.model = thisRole[0];
      }      
    });
  }

  // set a user
  setUser(user: any, e) {
    if(e.target.checked) {
      this.model.allowedUsersList.push(user.username);
    } else {
      this.model.allowedUsersList.splice(this.model.allowedUsersList.indexOf(user.username), 1);
    }
  }

  // set a group
  setGroup(group: any, e) {
    if(e.target.checked) {
      this.model.allowedGroupsList.push(group.name);
    } else {
      this.model.allowedGroupsList.splice(this.model.allowedGroupsList.indexOf(group.name), 1);
    }
  }

  // save
  save() {
    this.context.save(this.model).subscribe(x => {
      console.log(["user perm save", x]);
      this.router.navigateByUrl("/app/admin/permissions");
    });
  }

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy() {
    this.onObservableChanges.unsubscribe();
  }

}
