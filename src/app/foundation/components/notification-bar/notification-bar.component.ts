import { Component, OnInit } from '@angular/core';
import { NotificationContextService } from '../../services/notification/notification-context.service';
import { Observable } from 'rxjs';
import { EntityRouteResolverService } from 'src/app/common/services/entity-route-resolver.service';
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
    private routeResolver: EntityRouteResolverService
  ) { 
    this.count$ = context.listCount$;
    this.list$ = context.list$.pipe(map(x => x.reverse().slice(0, 3)));
  }

  model = {
    showMenu: false
  }

  // init
  ngOnInit() {

  }

  // get route
  getRoute(notification: any) {
    return this.routeResolver.resolve(notification.entityTypeId, notification.entityId);
  }

  // show list dialog
  showListDialog() {
    this.context.openListDialog();
  }
}
