import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class SetupPasswordContextService {

  // setup
  userId: string;
  setupId: string;
  instanceId: string;

  // state  
  validateResult$ = new Subject<{ success: boolean, errorText : string }>();    
  
  // new
  constructor(
    private authService : AuthService
  ) { }

  // validate
  validate(userId: string, setupId: string, instanceId: string) {
    
    // validate
    this.authService.validatePasswordSetup({
      userId: userId,
      setupId: setupId
    }).subscribe(x => {

      // set validate
      this.validateResult$.next(x);   

      // hold setup
      this.userId = userId;
      this.setupId = setupId;
      this.instanceId = instanceId;
    });
  }
  
  // update
  update(model: any) : Observable<any> {

    // check password
    if(!model.password) {
      return of({ success: false, errorText: "Password is required" });
    }

    // check if password match
    if(model.password != model.passwordConfirm) {
      return of({ success: false, errorText: "Passwords do not match"});
    }

    // if here, update
    return this.authService.updatePasswordFromSetup({
      userId: this.userId,
      setupId: this.setupId,
      password: model.password
    });
  }
}
