import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserContextService } from 'src/app/common/services/user-context.service';

@Component({
  selector: 'app-simulate-user',
  templateUrl: './simulate-user.component.html',
  styleUrls: ['./simulate-user.component.scss']
})
export class SimulateUserComponent implements OnInit {

  // observables
  isAdmin$ : Observable<boolean>;
  isImpersonating$ : Observable<boolean>;

  // new
  constructor(
    private userContext: UserContextService
  ) { }

  // init
  ngOnInit() {
    this.isAdmin$ = this.userContext.isAdmin$;
    this.isImpersonating$ = this.userContext.isImpersonating$;
  }

  // simulate user
  simulateUser(username: string) {
    this.userContext.simulateUser(username);
  }

  // clear impersonate
  clearImpersonate() {
    this.userContext.clearImpersonate();
  }
}
