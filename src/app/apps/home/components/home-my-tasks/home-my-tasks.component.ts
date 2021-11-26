import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationContextService } from 'src/app/foundation/services/notification/notification-context.service';
import { EntityRouteResolverService } from '../../../../common/services/entity-route-resolver.service';
import { EntityProviderService } from '../../../../core/services/entity/entity-provider.service';
import { ITaskItem } from '../../../../foundation/models/task/task-item';
import { TaskContextService } from '../../../../foundation/services/task/task-context.service';

@Component({
  selector: 'app-home-my-tasks',
  templateUrl: './home-my-tasks.component.html',
  styleUrls: ['./home-my-tasks.component.scss']
})
export class HomeMyTasksComponent implements OnInit {

  // observables
  list$: Observable<any>;

  // new
  constructor(
    private taskContext: TaskContextService,
    private routeResolver: EntityRouteResolverService,
    private entityProvider: EntityProviderService
  ) {
    this.list$ = taskContext.list$.pipe(map(x => [...x].reverse().slice(0, 20)));
  }

  // init
  ngOnInit() {
  }

  // open dialog
  openListDialog() {
    //todo: this.notificationContext.openListDialog();
  }
}
