import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { AdminWorkflowGroupApiService } from './admin-workflow-group-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowGroupEditContextService implements OnDestroy {
  
  // observables
  id$ = new BehaviorSubject<string>(null);
  viewEditModel$ = new BehaviorSubject<any>({});

  // subscriptions
  onIdChange$ : Subscription;

  // new
  constructor(
    private api: AdminWorkflowGroupApiService
  ) { 

    // subscribe to id change
    this.onIdChange$ = this.id$.subscribe(id => {
    
      // update model
      if(id != null)
        this.api.getSingle(id).subscribe(model => this.viewEditModel$.next(model));        
    });
  }

  // set id
  setId(id: string) {
    this.id$.next(id);
  }

  // update
  update(model: any) : Observable<any> {
    return this.api.update(model);
  }

  // clean up
  ngOnDestroy(): void {
    this.onIdChange$.unsubscribe();
  }
}
