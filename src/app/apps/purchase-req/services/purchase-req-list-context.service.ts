import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, timer, Subscription, of } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { debounce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqListContextService {
  readonly PAGE_SIZE : number = 20;

  // observables
  list$ = new BehaviorSubject<any>({});  
  filter$ = new BehaviorSubject<any>({
    status: 0,
    buyerGroup: "",
    searchText: "",
    requestUserId: ""
  });
  listType$ = new BehaviorSubject<number>(0);
  listFilterType$ = new BehaviorSubject<number>(0);
  page$ = new BehaviorSubject<number>(1);
  sort$ = new BehaviorSubject<any>({
    field: "CreateDateTime",
    isDescending: true
  });

  // lists
  statusList$ : Observable<any>;
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;

  // subscriptions
  onFilterChange$ : Subscription;

  // new
  constructor(
    private api : PurchaseReqApiService
  ) { 
 
    // setup filter change
    this.onFilterChange$ = combineLatest(
      this.filter$, 
      this.listType$, 
      this.listFilterType$,
      this.page$, 
      this.sort$
    ).pipe(debounce(() => timer(100))).subscribe(x => {
      this.refreshData();
    });    

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
  }

  // refresh data
  refreshData() {

    // combine model
    let model = {
      ...this.filter$.value,
      ...{
        listType: this.listType$.value
      },
      ...{
        listFilterType: this.listFilterType$.value
      },
      ...{
        pageNumber: this.page$.value,
        pageSize: this.PAGE_SIZE,        
      },
      ...{
        sortField: this.sort$.value.field,
        sortIsDescending: this.sort$.value.isDescending
      }
    };    

    // get the data
    this.api.getListFiltered(model).subscribe(x => {
      this.list$.next(x);      
    });
  }

  // set filter
  setFilter(model: any) {
    this.filter$.next(model);
    this.page$.next(1);
  }

  // set page
  setPage(page: number) {
    this.page$.next(page);
  }

  // set sort
  setSort(model: any) {
    this.sort$.next(model);
  }

  // set list type
  setListType(set: number) {
    this.listType$.next(set);
  }

  // set list filter type
  setListFilterType(set: number) {
    this.listFilterType$.next(set);
  }

  // clean up
  ngOnDestroy(): void {
    
    // subscriptions
    this.onFilterChange$.unsubscribe();
  }
}
