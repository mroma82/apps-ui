import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserContextService } from 'src/app/common/services/user-context.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { GlobalListsService } from '../../../../core/services/global-lists.service';

@Component({
  selector: 'app-simulate-user',
  templateUrl: './simulate-user.component.html',
  styleUrls: ['./simulate-user.component.scss']
})
export class SimulateUserComponent implements OnInit {

  // observables
  isAdmin$: Observable<boolean>;
  isImpersonating$: Observable<boolean>;
  userList$: Observable<any>;

  // state
  state = {
    simulatePending: false
  };

  // model
  model = {
    userId: ""
  };

  // new
  constructor(
    private userContext: UserContextService,
    private globalLists: GlobalListsService
  ) { }

  // init
  ngOnInit() {

    // get state
    this.isAdmin$ = this.userContext.isAdmin$;
    this.isImpersonating$ = this.userContext.isImpersonating$;

    // lists
    this.userList$ = this.globalLists.getUsers();
  }

  // simulate user
  simulateUser(userId: string) {
    if (userId) {
      this.userContext.simulateUser(userId);
      this.state.simulatePending = false;
      this.model.userId = "";
    }
  }

  // clear impersonate
  clearImpersonate() {
    this.userContext.clearImpersonate();
    this.model.userId = "";
  }
}
