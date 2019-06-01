import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsContextService {

  // observables
  permissions$ = new BehaviorSubject<any>([]);
  userList$ : Observable<any>;
  groupList : Observable<any>;

  // new
  constructor(
    private authService: AuthService
  ) { 

    // get lists
    this.userList$ = authService.getUsers();
    this.groupList = authService.getGroups();
  }


}
