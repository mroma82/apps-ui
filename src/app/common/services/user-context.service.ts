import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  // observables
  isAuthenticated$ = new BehaviorSubject<boolean>(true);
  profile$ = new BehaviorSubject<any>({});
  
  // new
  constructor() { 

    // hack: force auth
    this.profile$.next({
      username: "mroma",
      name: "Michael Roma"
    })
  }
}
