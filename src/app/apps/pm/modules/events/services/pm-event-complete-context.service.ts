import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserContextService } from '../../../../../common/services/user-context.service';
import { PmEventApiService } from './pm-event-api.service';

@Injectable()
export class PmEventCompleteContextService {

  dialogOpen$ = new BehaviorSubject<boolean>(false);
  model$ = new BehaviorSubject<any>({});

  // new
  constructor(
    private userContext: UserContextService,
    private api: PmEventApiService
  ) { }

  // open dialog
  open(event: any) {

    // init model
    var model: any = {
      eventId: event.id
    };

    // set the date
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    model.completedDateTime = today.toISOString();

    // set the user
    this.userContext.profile$.pipe(take(1)).subscribe(x => {
      model.completedUserId = x.userId;
    });

    // set model
    this.model$.next(model);

    // open dialog
    this.dialogOpen$.next(true);
  }

  // close dialog
  close() {
    this.dialogOpen$.next(false);
  }

  // complete
  complete(model: any): Observable<boolean> {
    return this.api.complete(model);
  }
}
