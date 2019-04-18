import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ExampleService } from './example.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExampleViewEditContextService implements OnDestroy {

  // observables
  id$ = new BehaviorSubject<string>(null);
  exampleRecord$ = new BehaviorSubject<any>({});

  // lists
  statusList$: Observable<any>;
  
  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private service: ExampleService
  ) { 

    // status list
    this.statusList$ = service.getStatusList();

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
