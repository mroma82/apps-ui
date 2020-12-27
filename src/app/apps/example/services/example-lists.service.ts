import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { ExampleService } from './example.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleListsService {

  // observables
  userList$ : Observable<any>;
  statusList$ : Observable<any>;
  statusValueList$ : Observable<any>;
  departmentList$ : Observable<any>;

  // new
  constructor(
    authService : AuthService,
    service : ExampleService,
    listItems: ListItemService
  ) { 

    // set lists
    this.userList$ = authService.getUsers();

    // status list
    this.statusList$ = this.getStatusList();    

    // get params    
    const params$ = service.getParameters();

    // get status from params
    this.statusValueList$ = params$.pipe(mergeMap(x => 
      listItems.getItemsByType(x.statusListTypeId).pipe(take(1))
    ));

    // get departments from params    
    this.departmentList$ = params$.pipe(mergeMap(x => 
      listItems.getItemsByType(x.departmentListTypeId).pipe(take(1))
    ));
  }

  // get status list
  getStatusList() : Observable<any> {
    return of([
      { code: 0, text: "Not started" },
      { code: 1, text: "In Processed" },
      { code: 2, text: "Approved" },
      { code: 3, text: "Completed" }
    ]);
  }
}
