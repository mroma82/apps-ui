import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { tap, shareReplay, map, mergeMap } from 'rxjs/operators';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { IntegrationService } from 'src/app/common/services/integration.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqListsService {

  // lists
  statusList$ : Observable<any>;
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>; //= new BehaviorSubject<any>([]);
  projectList$ : Observable<any>;
  departmentList$ : Observable<any>;
  locationList$ : Observable<any>;
  ledgerList$: Observable<any>;

  // new
  constructor(
    api : PurchaseReqApiService,
    auth : AuthService,
    integration: IntegrationService,
    listItems : ListItemService
  ) { 
    
    // status list
    this.statusList$ = of([
      { code: 1, text: "Open" },
      { code: 2, text: "Closed" }
    ]);    

    // users
    this.userList$ = auth.getUsers().pipe(shareReplay());

    // users
    this.locationList$ = integration.getLocationList().pipe(shareReplay());
    this.projectList$ = integration.getProjectList().pipe(shareReplay());
    this.departmentList$ = integration.getDepartmentList().pipe(shareReplay());
    this.ledgerList$ = integration.getLedgerList().pipe(shareReplay());

    // from params  
    var params$ = api.getParameters().pipe(shareReplay());
    this.buyerGroupList$ = params$.pipe(mergeMap(x => listItems.getItemsByType(x.buyerGroupListTypeId)), shareReplay());        
  }
}
