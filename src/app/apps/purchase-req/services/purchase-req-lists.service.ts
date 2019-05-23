import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqListsService {

  // lists
  statusList$ : Observable<any>;
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;
  projectList$ : Observable<any>;
  departmentList$ : Observable<any>;
  locationList$ : Observable<any>;

  // new
  constructor() { 

    // status list
    this.statusList$ = of([
      { code: 1, text: "Open" },
      { code: 2, text: "Closed" }
    ]);

    // buyer groups
    this.buyerGroupList$ = of([
      { code: "IT", text: "IT" },
      { code: "Purchasing", text: "Purchasing" },
      { code: "Self", text: "Self" }
    ]);

    // users
    this.userList$ = of([
      { username: "mroma", fullName: "Michael Roma" },
      { username: "mjones", fullName: "Mary Jones" }
    ]);

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
  }
}
