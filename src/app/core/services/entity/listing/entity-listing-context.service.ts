import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription, timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { ENTITY_LISTING_CONFIG, IEntityListingConfigurationService } from './entity-listing-configuration.service';

@Injectable()
export class EntityListingContextService {

  // observables
  listItems$ = new BehaviorSubject<any>([]);  
  view$ = new BehaviorSubject<any>({});
  filter$ = new BehaviorSubject<any>({});
  searchText$ = new BehaviorSubject<string>(null);
  isWorkflowAssigned$ = new BehaviorSubject<boolean>(false);

  // permissions
  canCreate$ = this.api.hasAccess(this.entityConfig.entityTypeId,SecurityPermissionMask.Add);
  canEdit$ = this.api.hasAccess(this.entityConfig.entityTypeId,SecurityPermissionMask.Edit);

  // paging
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(25);
  
  sort$ = new BehaviorSubject<any>({
    field: "CreateDateTime",
    isDescending: true
  });
  

  // subscriptions
  onFilterChange$ : Subscription;
  
  // new
  constructor(
    private entityConfig : EntityConfigurationService,
    @Inject(ENTITY_LISTING_CONFIG) private listingConfig : IEntityListingConfigurationService,
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
      this.isWorkflowAssigned$
    ).pipe(debounce(() => timer(100))).subscribe(() => this.refreshData());

    // get the first view
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
      pageNumber: this.page$.value,
      pageSize: this.pageSize$.value,              
      sortField: this.sort$.value.field,
      sortIsDescending: this.sort$.value.isDescending,
      isWorkflowAssigned: this.isWorkflowAssigned$.value      
    };    

    // get the data
    this.api.list(this.entityConfig.entityTypeId, model).subscribe(x => {
      this.listItems$.next(x);      
    });
  }

  // set view 
  setView(model: any) {
    this.view$.next(model);

    if(model.sort) {
      this.sort$.next(model.sort);
    }
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

  // set search text
  setSearchText(text: string) {
    this.searchText$.next(text);
  }

  // set page
  setPage(page: number) {
    this.page$.next(page);
  }

  // set page size
  setPageSize(size: number) {
    this.pageSize$.next(size);
  }

  // set sort
  setSort(sort: any) {
    this.sort$.next(sort);
  }

  // set workflow assigned filter
  setIsWorkflowAssigned(set: boolean) {
    this.isWorkflowAssigned$.next(set);
  }

  // reset filter
  clearFilter() {
    
    // clear all
    this.filter$.next({});
    this.searchText$.next(null);
    this.page$.next(1);
  }
}
