import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserContextService } from 'src/app/common/services/user-context.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-simulate-user',
  templateUrl: './simulate-user.component.html',
  styleUrls: ['./simulate-user.component.scss']
})
export class SimulateUserComponent implements OnInit {

  // observables
  isAdmin$ : Observable<boolean>;
  isImpersonating$ : Observable<boolean>;
  userList$ : Observable<any>;

  // state
  state = {
    simulatePending: false
  };

  // model
  model = {
    username: ""
  };

  // new
  constructor(
    private userContext: UserContextService,
    private authService : AuthService
  ) { }

  // init
  ngOnInit() {

    // get state
    this.isAdmin$ = this.userContext.isAdmin$;
    this.isImpersonating$ = this.userContext.isImpersonating$;

    // lists
    this.userList$ = this.authService.getUsers();
  }

  // simulate user
  simulateUser(username: string) {
    if(username) {
      this.userContext.simulateUser(username);
      this.state.simulatePending = false;
      this.model.username = "";
    }
  }

  // clear impersonate
  clearImpersonate() {
    this.userContext.clearImpersonate();
    this.model.username = "";
  }
}
