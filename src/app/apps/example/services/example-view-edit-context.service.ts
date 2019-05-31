import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { ExampleService } from './example.service';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { ExampleListsService } from './example-lists.service';
import { DialogService } from 'src/app/common/services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleViewEditContextService implements OnDestroy {

  // observables
  id$ = new BehaviorSubject<string>(null);
  exampleRecord$ = new BehaviorSubject<any>({});

  // lists
  userList$: Observable<any>;
  statusList$: Observable<any>;
  statusValueList$ = new BehaviorSubject<any>([]);

  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private service: ExampleService,
    private listItems: ListItemService,
    private appContext: AppContextService,
    private dialogService: DialogService,
    lists: ExampleListsService
  ) { 

    // status list
    this.statusList$ = service.getStatusList();
    this.userList$ = lists.userList$;

    // get params
    this.service.getParameters().pipe(tap(x => {
      if(x) {
        this.listItems.getItemsByType(x.statusListTypeId).subscribe(lst => this.statusValueList$.next(lst));
      }
    })).subscribe();            

    // id change
    this.onIdChange$ = this.id$.subscribe(x => {
      if(x)
        this.refreshData();
    })
  }

  // set id
  setId(id: string) {
    this.id$.next(id);
  }
  
  // refresh
  refreshData() {

    // get the data
    this.service.getSingle(this.id$.value).subscribe(x => {
      this.exampleRecord$.next(x);

      // set title
      this.appContext.Layout.setTitle("Example: " + x.exampleId);
    });
  }

  // update 
  update() : Observable<boolean> {
    
    // validate
    if(!this.exampleRecord$.value.customerId) {
      this.dialogService.message("Validation", "Customer is required");
      return of(false);
    }

    // update, check if ok
    return this.service.update({
      example: this.exampleRecord$.value
    }).pipe(map(x => {
      if(x.success) {
        return true;
      } else {
        // todo: show error
        console.log(x.text);
        return false;
      }
    }));
  }

  // delete
  delete() : Observable<boolean> {

    // delete, check if ok
    return this.service.delete(this.id$.value).pipe(map(x => {
      if(x.success) {
        return true;
      } else {
        // todo: show error
        console.log(x.text);
        return false;
      }
    }));
  }

  // destroy
  ngOnDestroy() {
    // clean up
  }
}
