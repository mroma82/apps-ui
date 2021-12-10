import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { WorkflowService } from './workflow.service';
import { IEntity } from 'src/app/common/models/context';
import { NotificationContextService } from '../notification/notification-context.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { AppContextService } from 'src/app/app-context.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowContextService implements OnDestroy {

  // observables
  busy$ = new BehaviorSubject<boolean>(false);
  entity$ = new BehaviorSubject<IEntity>(null);
  instance$ = new BehaviorSubject<any>(null);
  actions$ = new BehaviorSubject<any>([]);
  assigned$ = new BehaviorSubject<any>([]);
  history$ = new BehaviorSubject<any>([]);

  // dialog obseravables
  assignedListDialogOpenClose$ = new BehaviorSubject<boolean>(false);
  rejectDialogOpenClose$ = new BehaviorSubject<boolean>(false);
  historyDialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // options
  options = {
    url: ""
  };

  // subscriptions
  onContextChange: Subscription;
  onInstanceChange: Subscription;

  // new
  constructor(
    private service: WorkflowService,
    private notificationContext: NotificationContextService,
    private dialogService: DialogService,
    private appContext: AppContextService
  ) {

    // on context change
    this.onContextChange = combineLatest([
      this.entity$,
      this.appContext.User.profile$
    ]).subscribe(x => {
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
    this.options = { ...this.options, ...options };
  }

  // set context
  setEntity(entity: IEntity) {
    this.entity$.next(entity);
  }

  // refresh instance
  refreshInstance() {
    this.busy$.next(true);
    let context = this.entity$.value;
    if (context !== null) {
      this.service.getInstanceByEntity(this.options.url, context).subscribe(i => this.instance$.next(i));
      this.busy$.next(false);
    }
  }

  // refresh actions
  refreshActions() {
    let instance = this.instance$.value;
    if (instance !== null) {
      this.service.getActions(instance.id).subscribe(x => this.actions$.next(x));
    }
  }

  // refresh assigned
  refreshAssigned() {
    let instance = this.instance$.value;
    if (instance !== null) {
      this.service.getAssigned(instance.id).subscribe(x => this.assigned$.next(x));
    }
  }

  // refresh history
  refreshHistory() {
    let instance = this.instance$.value;
    if (instance !== null) {
      this.service.getHistory(instance.id).subscribe(x => this.history$.next(x));
    }
  }


  // advance
  advance(instanceId: string, pushModel: any) {
    this.busy$.next(true);
    this.service.advance(this.options.url, instanceId, pushModel).subscribe(x => {
      this.refreshInstance();
      this.notificationContext.refreshList();
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
    })
  }

  // reset
  reset() {

    // ask
    this.dialogService.yesNo("Cancel Workflow", "Are you sure you want to cancel the workflow?").subscribe(x => {
      if (x == DialogResultEnum.Yes) {

        // get the instance
        const instance = this.instance$.value;

        // reset
        this.busy$.next(true);
        this.service.reset(this.options.url, instance.id, instance.currentTaskId).subscribe(x => {
          this.refreshInstance();
          this.notificationContext.refreshList();
          this.busy$.next(false);
        });
      }
    });
  }

  // cancel
  cancel() {

    // ask
    this.dialogService.yesNo("Cancel Workflow", "Are you sure you want to cancel the workflow?").subscribe(x => {
      if (x == DialogResultEnum.Yes) {

        // get the instance
        const instance = this.instance$.value;

        // cancel
        this.busy$.next(true);
        this.service.cancel(this.options.url, instance.id, instance.currentTaskId).subscribe(x => {
          this.refreshInstance();
          this.notificationContext.refreshList();
          this.busy$.next(false);
        });
      }
    });
  }

  // regenerate
  regenerate() {

    // get the instance
    const instance = this.instance$.value;

    // cancel
    this.busy$.next(true);
    this.service.regenerate(this.options.url, instance.id).subscribe(x => {
      this.refreshInstance();
      this.notificationContext.refreshList();
      this.busy$.next(false);
    });
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
