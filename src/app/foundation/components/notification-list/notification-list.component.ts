import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationContextService } from '../../services/notification/notification-context.service';
import { ContextTypeRouteResolverService } from 'src/app/common/services/context-type-route-resolver.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  
  // list
  list: any[];

  // subscriptions
  onListChange : Subscription;

  // model
  model = {
    selectAll: false
  };
  
  // new
  constructor(
    private context : NotificationContextService,
    private routeResolver : ContextTypeRouteResolverService
  ) { 
    // subscribe
    this.onListChange = this.context.list$.subscribe(x => {
      this.list = x;
    })
  }

  // get route
  getRoute(notification: any) {
    return this.routeResolver.resolve(notification.contextType, notification.contextId);
  }

  // close dialog
  closeDialog() {
    this.context.closeListDialog();
  }

  // select all/none
  selectAllNone(select: boolean) {
    this.list.forEach(x => {
      x.selected = select;
    });
  }

  // delete
  deleteSelected() {
    this.context.deleteByList(this.list.filter(x => x.selected).map(x => x.id));
  }

  // set read state
  setReadStateSelected(state: boolean) {
    this.context.setReadStateByList(this.list.filter(x => x.selected).map(x => x.id), state);
  }

  ngOnInit() {

    
  }

  // clean up
  ngOnDestroy(): void {
    this.onListChange.unsubscribe();
  }
}
