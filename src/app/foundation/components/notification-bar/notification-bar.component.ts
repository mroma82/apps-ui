import { Component, OnInit } from '@angular/core';
import { NotificationContextService } from '../../services/notification/notification-context.service';
import { Observable } from 'rxjs';
import { ContextTypeRouteResolverService } from 'src/app/common/services/context-type-route-resolver.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  // define count 
  count$ : Observable<number>;
  list$ : Observable<any>;

  constructor(
    private context : NotificationContextService,
    private routeResolver: ContextTypeRouteResolverService
  ) { 
    this.count$ = context.listCount$;
    this.list$ = context.list$.pipe(map(x => x.reverse().slice(0, 3)));
  }

  // init
  ngOnInit() {

  }

  // get route
  getRoute(notification: any) {
    return this.routeResolver.resolve(notification.contextType, notification.contextId);
  }

  // show list dialog
  showListDialog() {
    this.context.openListDialog();
  }
}
