import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { GlobalListsService } from '../../../core/services/global-lists.service';
import { ExampleService } from './example.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleListsService {

  // observables
  userList$: Observable<any>;
  statusList$: Observable<any>;
  statusValueList$: Observable<any>;
  departmentList$: Observable<any>;

  // new
  constructor(
    globalLists: GlobalListsService,
    service: ExampleService,
    listItems: ListItemService,
    private appClient: AppHttpClientService
  ) {

    // set lists
    this.userList$ = globalLists.getUsers();

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
  getStatusList(): Observable<any> {
    return this.appClient.get("/example/getStatusList");
  }
}
