import { Injectable, OnDestroy } from '@angular/core';
import { ExampleService } from './example.service';
import { Observable, BehaviorSubject, Subscription, combineLatest, timer, of } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleListContextService implements OnDestroy {  
  readonly PAGE_SIZE : number = 20;

  // observables
  list$ = new BehaviorSubject<any>({});  
  filter$ = new BehaviorSubject<any>({
    status: -1
  });
  page$ = new BehaviorSubject<number>(1);
  sort$ = new BehaviorSubject<any>({
    field: "CreateDateTime",
    isDescending: true
  });

  // lists
  statusList$ : Observable<any>;

  // subscriptions
  onFilterChange$ : Subscription;

  // new
  constructor(
    private service : ExampleService
  ) { 
 
    // setup filter change
    this.onFilterChange$ = combineLatest(this.filter$, this.page$, this.sort$).pipe(debounce(() => timer(100))).subscribe(x => {
      this.refreshData();
    })

    // statuses
    this.statusList$ = service.getStatusList();
  }

  // refresh data
  refreshData() {

    // combine model
    let model = {
      ...this.filter$.value,
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
    this.service.getListFiltered(model).subscribe(x => {
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

  // clean up
  ngOnDestroy(): void {
    
    // subscriptions
    this.onFilterChange$.unsubscribe();
  }
}
