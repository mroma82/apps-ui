import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ExampleService } from './example.service';
import { map, shareReplay } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { ListItemService } from 'src/app/common/services/list-item.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleViewEditContextService implements OnDestroy {

  // observables
  id$ = new BehaviorSubject<string>(null);
  exampleRecord$ = new BehaviorSubject<any>({});

  // lists
  statusList$: Observable<any>;
  statusValueList$ : Observable<any>;

  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private service: ExampleService,
    private listItems: ListItemService,
    private appContext: AppContextService
  ) { 

    // status list
    this.statusList$ = service.getStatusList();
    this.statusValueList$ = this.listItems.getItemsByType("47cac5f6-6d33-4e40-a89e-ebc37d0ec9c5").pipe(shareReplay());

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
