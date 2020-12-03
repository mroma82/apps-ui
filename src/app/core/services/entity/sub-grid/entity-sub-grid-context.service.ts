import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { IEntitySubGridConfigurationService } from './entity-sub-grid-configuration.service';


@Injectable()
export class EntitySubGridContextService implements OnDestroy {

  // state
  entityTypeId$ = new BehaviorSubject<string>(null);
  filter$ = new BehaviorSubject<any>({});  
  refresh$ = new BehaviorSubject<number>(0);
  modelDefault$ = new BehaviorSubject<any>(null);

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
    private api: EntityApiService,
    private config: EntityConfigurationService,
    private dialogService: DialogService
  ) { 

    // setup subscription to refresh
    const rx = combineLatest(
      this.entityTypeId$,
      this.filter$,
      this.sort$,
      this.refresh$
    ).pipe(debounce(() => timer(100)))
     .subscribe(([entityTypeId, filter, sort]) => {

      // get the data
      this.api.list(entityTypeId, {        
        filter: filter,
        pageNumber: 1,
        pageSize: 25, //hack               
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

  // delete
  delete(id: string) : Observable<boolean> {

    // delete, check if ok
    return this.api.delete(this.config.entityTypeId, id).pipe(map(x => {
      if(x.success) {
        this.refreshData();
        return true;
      } else {        
        this.dialogService.message("Error during delete", x.text);
        return false;
      }
    }));
  }

  // cleanup
  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
