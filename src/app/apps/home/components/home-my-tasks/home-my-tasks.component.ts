import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationContextService } from 'src/app/foundation/services/notification/notification-context.service';

@Component({
  selector: 'app-home-my-tasks',
  templateUrl: './home-my-tasks.component.html',
  styleUrls: ['./home-my-tasks.component.scss']
})
export class HomeMyTasksComponent implements OnInit {

  // observables
  list$ : Observable<any>;

  // new
  constructor(
    private notificationContext: NotificationContextService
  ) { 
    this.list$ = notificationContext.list$.pipe(map(x => x.reverse().slice(0, 20)));
  }

  // init
  ngOnInit() {
  }

  // open dialog
  openListDialog() {
    this.notificationContext.openListDialog();
  }
}
