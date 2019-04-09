import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WorkflowService } from './workflow.service';
import { IContext } from 'src/app/common/models/context';

@Injectable({
  providedIn: 'root'
})
export class WorkflowContextService implements OnDestroy {

  // observables
  busy$ = new BehaviorSubject<boolean>(false);
  context$ = new BehaviorSubject<IContext>(null);    
  instance$ = new BehaviorSubject<any>(null);
  actions$ = new BehaviorSubject<any>([]);

  // options
  options = {
    url: ""
  };
  
  // subscriptions
  onContextChange : Subscription;
  onInstanceChange: Subscription;

  // new
  constructor(
    private service: WorkflowService
  ) { 
    
    // on context change
    this.onContextChange = this.context$.subscribe(x => {
      this.refreshInstance()
    });
    this.onInstanceChange = this.instance$.subscribe(x => {
      this.refreshActions();
    });
  }

  // set options
  setOptions(options: any) {
    this.options = {...this.options, ...options};
  }

  // set context
  setContext(context: IContext) {
    this.context$.next(context);
  }

  // refresh instance
  refreshInstance() {    
    let context = this.context$.value;    
    if(context !== null) {
        this.service.getInstanceByContext(context).subscribe(i => this.instance$.next(i));
    }
  }

  // refresh actions
  refreshActions() {
    let instance = this.instance$.value;
    if(instance !== null) {
      this.service.getActions(instance.id).subscribe(x => this.actions$.next(x));
    }
  }

  // advance
  advance(instanceId: string, pushModel: any) {
    this.busy$.next(true);
    this.service.advance(this.options.url, instanceId, pushModel).subscribe(x => {
      this.refreshInstance();
      this.busy$.next(false);
    })
  }

  // reject
  reject(instanceId: string, taskId: string) {
    this.busy$.next(true);
    this.service.reject(this.options.url, instanceId, taskId).subscribe(x => {
      this.refreshInstance();
      this.busy$.next(false);
    })
  }

  // reset
  reset(instanceId: string, taskId: string) {
    this.busy$.next(true);
    this.service.reset(this.options.url, instanceId, taskId).subscribe(x => {
      this.refreshInstance();
      this.busy$.next(false);
    })
  }

  // clean up
  ngOnDestroy(): void {
    
    // subscriptions
    this.onContextChange.unsubscribe();
    this.onInstanceChange.unsubscribe();
  }
}
