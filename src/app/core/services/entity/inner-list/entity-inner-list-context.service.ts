import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from '../entity-api.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../entity-configuration.service';


@Injectable()
export class EntityInnerListContextService implements OnDestroy {

  // state
  entityTypeId$ = new BehaviorSubject<string>(null);
  filter$ = new BehaviorSubject<any>({});
  refresh$ = new BehaviorSubject<number>(0);
  maxItems$ = new BehaviorSubject<number>(0);

  // sorting
  sort$ = new BehaviorSubject<any>({
    field: "CreateDateTime"
  });

  // items
  items$ = new BehaviorSubject<any[]>([]);

  // subscrptions
  subs$ = new Subscription();

  // new
  constructor(
    private api: EntityApiService
  ) {

    // setup subscription to refresh
    const rx = combineLatest([
      this.entityTypeId$,
      this.filter$,
      this.sort$,
      this.maxItems$,
      this.refresh$
    ]).pipe(debounce(() => timer(100)))
      .subscribe(([entityTypeId, filter, sort, maxItems]) => {

        // get the data
        this.api.list(entityTypeId, {
          filter: filter,
          pageNumber: 1,
          pageSize: maxItems,
          sortField: sort.field,
          sortIsDescending: sort.isDescending
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
