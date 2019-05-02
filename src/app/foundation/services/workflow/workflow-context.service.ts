import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WorkflowService } from './workflow.service';
import { IContext } from 'src/app/common/models/context';
import { NotificationContextService } from '../notification/notification-context.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowContextService implements OnDestroy {

  // observables
  busy$ = new BehaviorSubject<boolean>(false);
  context$ = new BehaviorSubject<IContext>(null);    
  instance$ = new BehaviorSubject<any>(null);
  actions$ = new BehaviorSubject<any>([]);
  assigned$ = new BehaviorSubject<any>([]);
  history$ = new BehaviorSubject<any>([]);

  // dialog obseravables
  assignedListDialogOpenClose$ = new BehaviorSubject<boolean>(false);
  rejectDialogOpenClose$ = new BehaviorSubject<boolean>(false);
  resetDialogOpenClose$ = new BehaviorSubject<boolean>(false);
  historyDialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // options
  options = {
    url: ""
  };
  
  // subscriptions
  onContextChange : Subscription;
  onInstanceChange: Subscription;

  // new
  constructor(
    private service: WorkflowService,
    private notificationContext: NotificationContextService
  ) { 
    
    // on context change
    this.onContextChange = this.context$.subscribe(x => {
      this.refreshInstance()
    });

    // instance change
    this.onInstanceChange = this.instance$.subscribe(x => {
      this.refreshActions();
      this.refreshAssigned();
      this.refreshHistory();
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
        this.service.getInstanceByContext(this.options.url, context).subscribe(i => this.instance$.next(i));
    }
  }

  // refresh actions
  refreshActions() {
    let instance = this.instance$.value;
    if(instance !== null) {
      this.service.getActions(instance.id).subscribe(x => this.actions$.next(x));
    }
  }

  // refresh assigned
  refreshAssigned() {
    let instance = this.instance$.value;
    if(instance !== null) {
      this.service.getAssigned(instance.id).subscribe(x => this.assigned$.next(x));
    }
  }

  // refresh history
  refreshHistory() {
    let instance = this.instance$.value;
    if(instance !== null) {
      this.service.getHistory(instance.id).subscribe(x => this.history$.next(x));
    }
  }


  // advance
  advance(instanceId: string, pushModel: any) {
    this.busy$.next(true);
    this.service.advance(this.options.url, instanceId, pushModel).subscribe(x => {
      this.refreshInstance();
      this.notificationContext.refreshList();
      this.busy$.next(false);
    })
  }

  // reject
  reject(instanceId: string, taskId: string, reason: string) {

    // define model
    let model = {
      currentTaskId: taskId,
      decisionText: reason
    }

    this.busy$.next(true);
    this.service.reject(this.options.url, instanceId, model).subscribe(x => {
      this.refreshInstance();
      this.notificationContext.refreshList();
      this.busy$.next(false);
    })
  }

  // reset
  reset(instanceId: string, taskId: string) {
    this.busy$.next(true);
    this.service.reset(this.options.url, instanceId, taskId).subscribe(x => {
      this.refreshInstance();
      this.notificationContext.refreshList();
      this.busy$.next(false);
    })
  }

  // assigned list dialog open/close
  openAssignedDialog() {
    this.assignedListDialogOpenClose$.next(true);
  }
  closeAssignedDialog() {
    this.assignedListDialogOpenClose$.next(false);
  }
  
  // reject dialog open/close
  openRejectDialog() {
    this.rejectDialogOpenClose$.next(true);
  }
  closeRejectDialog() {
    this.rejectDialogOpenClose$.next(false);
  }

  // reset dialog open/close
  openResetDialog() {
    this.resetDialogOpenClose$.next(true);
  }
  closeResetDialog() {
    this.resetDialogOpenClose$.next(false);
  }

  // history dialog open/close
  openHistoryDialog() {
    this.historyDialogOpenClose$.next(true);
  }
  closeHistoryDialog() {
    this.historyDialogOpenClose$.next(false);
  }

  
  // clean up
  ngOnDestroy(): void {
    
    // subscriptions
    this.onContextChange.unsubscribe();
    this.onInstanceChange.unsubscribe();
  }
}
