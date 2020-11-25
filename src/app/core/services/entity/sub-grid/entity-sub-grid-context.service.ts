import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { EntityApiService } from '../entity-api.service';
import { IEntitySubGridConfigurationService } from './entity-sub-grid-configuration.service';


@Injectable()
export class EntitySubGridContextService implements OnDestroy {

  // state
  entityTypeId$ = new BehaviorSubject<string>(null);
  filter$ = new BehaviorSubject<any>({});
  refresh$ = new BehaviorSubject<number>(0);
  modelDefault$ = new BehaviorSubject<any>(null);

  // items
  items$ = new BehaviorSubject<any[]>([]);

  // subscrptions
  subs$ = new Subscription();

  // new
  constructor(
    private api: EntityApiService
  ) { 

    // setup subscription to refresh
    const rx = combineLatest(
      this.entityTypeId$,
      this.filter$,
      this.refresh$
    ).pipe(debounce(() => timer(100)))
     .subscribe(([entityTypeId, filter]) => {

      // get the data
      this.api.list({
        entityTypeId: entityTypeId,
        filter: filter,
        pageNumber: 1,
        pageSize: 25 //hack        
      }).subscribe(data => {
        this.items$.next(data.items);
      });
    });

    this.subs$.add(rx);
  }

  // refresh
  refreshData() {
    this.refresh$.next(1);
  }

  // cleanup
  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
