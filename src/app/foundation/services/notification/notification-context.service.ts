import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge, forkJoin } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationContextService {

  // observables
  list$ = new BehaviorSubject<any>([]);
  listCount$ = new BehaviorSubject<number>(0);
  listDialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private service : NotificationService
  ) { 

    // initial refresh
    this.refreshList();
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
}
