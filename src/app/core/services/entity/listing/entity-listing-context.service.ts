import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription, timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { IEntityListingConfigurationService } from './entity-listing-configuration.service';

@Injectable()
export class EntityListingContextService {

  // observables
  listItems$ = new BehaviorSubject<any>([]);  
  view$ = new BehaviorSubject<any>({});
  filter$ = new BehaviorSubject<any>({});
  searchText$ = new BehaviorSubject<string>(null);

  
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(25);
  
  sort$ = new BehaviorSubject<any>({
    field: "CreateDateTime",
    isDescending: true
  });
  /*
  isMyTasks$ = new BehaviorSubject<boolean>(false);
  */


  // subscriptions
  onFilterChange$ : Subscription;
  
  // new
  constructor(
    private entityConfig : EntityConfigurationService,
    @Inject("IEntityListingConfigurationService") private listingConfig : IEntityListingConfigurationService,
    private api : EntityApiService
  ) { 

    // setup filter change
    this.onFilterChange$ = combineLatest(
      this.view$,
      this.filter$, 
      this.searchText$,
      this.page$,       
      this.pageSize$,
      this.sort$, 
      /*this.isMyTasks$*/
    ).pipe(debounce(() => timer(100))).subscribe(() => this.refreshData());

    this.listingConfig.getViews().pipe(take(1)).subscribe(x => {
      this.setView(x[0]);
    });
  }

  // refresh data
  refreshData() {

    // combine model
    let model = {
      entityTypeId: this.entityConfig.entityTypeId,
      filter: {
        ...this.filter$.value,
        ...this.view$.value.filter                      
      },
      searchText: this.searchText$.value,
      /*
      ...{
        isMyTasks: this.isMyTasks$.value
      },*/
      ...{
        pageNumber: this.page$.value,
        pageSize: this.pageSize$.value,        
      },      
      ...{
        sortField: this.sort$.value.field,
        sortIsDescending: this.sort$.value.isDescending
      }
    };    

    // get the data
    this.api.list(model).subscribe(x => {
      this.listItems$.next(x);      
    });
  }

  // set view 
  setView(model: any) {
    this.view$.next(model);
  }

  // set filter
  setFilter(model: any) {    

    // merge filter
    this.filter$.next({
      ...this.filter$.value,
      ...model
    });

    // refresh filter
    this.page$.next(1);
  }

  setSearchText(text: string) {
    this.searchText$.next(text);
  }

  setPage(page: number) {
    this.page$.next(page);
  }

  setPageSize(size: number) {
    this.pageSize$.next(size);
  }

  setSort(sort: any) {
    this.sort$.next(sort);
  }
}
