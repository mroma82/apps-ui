import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, merge, forkJoin, Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { UserContextService } from 'src/app/common/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationContextService implements OnDestroy {

  // observables
  list$ = new BehaviorSubject<any>([]);
  listCount$ = new BehaviorSubject<number>(0);
  listDialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // subscriptions
  onAuthChange$ : Subscription;

  // new
  constructor(
    private service : NotificationService,
    private userContext: UserContextService
  ) { 
    // initial refresh
    this.refreshList();

    // setup subscription for auth change
    this.onAuthChange$ = this.userContext.profile$.subscribe(x => {
      this.refreshList();
    });
  }

  // refresh
  refreshList() : void {

    // get from api
    this.service.getAllForCurrentUser().subscribe(x => {
      this.list$.next(x);
      this.listCount$.next(x.length);
    });
  }

  // delete by id
  deleteByList(ids: string[]) {

    // delete each
    forkJoin(ids.map(id => this.service.delete(id))).subscribe(x => {
      this.refreshList();
    });
  }

  // set read state by list
  setReadStateByList(ids: string[], state: boolean) {

    // delete each
    forkJoin(ids.map(id => this.service.markAsReadState(id, state))).subscribe(x => {
      this.refreshList();
    });
  }

  // open dialog
  openListDialog() : void {
    this.listDialogOpenClose$.next(true);
  }

  // close dialog
  closeListDialog() : void {
    this.listDialogOpenClose$.next(false);
  }

  // on destroy
  ngOnDestroy() {
    this.onAuthChange$.unsubscribe();
  }
}
