import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { tap, shareReplay } from 'rxjs/operators';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqListsService {

  // lists
  statusList$ : Observable<any>;
  userList$ : Observable<any>;
  buyerGroupList$ = new BehaviorSubject<any>([]);
  projectList$ : Observable<any>;
  departmentList$ : Observable<any>;
  locationList$ : Observable<any>;

  // new
  constructor(
    api : PurchaseReqApiService,
    auth : AuthService,
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
    this.projectList$ = of([
      { projectId: "PROJ1", projectName: "Project 1" },
      { projectId: "PROJ2", projectName: "Project 2" }
    ]);

    // users
    this.departmentList$ = of([
      { departmentId: "D1", departmentName: "Department 1" },
      { departmentId: "D2", departmentName: "Department 2" }
    ]);

    // users
    this.locationList$ = of([
      { locationId: "LOC1", locationName: "Location 1" },
      { locationId: "LOC2", locationName: "Location 2" }
    ]);

    // from params    
    api.getParameters().pipe(tap((x : any) => {
      if(x) {

        // set lists
        listItems.getItemsByType(x.buyerGroupListTypeId).subscribe(x => this.buyerGroupList$.next(x));   
      }
    })).subscribe();   
  }
}
