import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsContextService {

  // observables
  permissions$ = new BehaviorSubject<any>([]);
  userList$ : Observable<any>;
  groupList$ : Observable<any>;

  // new
  constructor(
    private authService: AuthService
  ) { 

    // get lists
    this.userList$ = authService.getUsers();
    this.groupList$ = authService.getGroups();
  }

  // refresh data
  refreshData() {
    
    // get the data
    this.authService.getUserPermissions().subscribe(x => {
      this.permissions$.next(x);
    });
  }

  // save
  save(model: any) : Observable<any> {

    // save the data
    return this.authService.updateUserPermission(model).pipe(tap(x => this.refreshData()));    
  }
}
