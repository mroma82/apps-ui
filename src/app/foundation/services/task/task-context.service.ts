import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, Subscription, zip } from 'rxjs';
import { combineAll, map, tap } from 'rxjs/operators';
import { UserContextService } from '../../../common/services/user-context.service';
import { EntityProviderService } from '../../../core/services/entity/entity-provider.service';
import { ITaskItem } from '../../models/task/task-item';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskContextService implements OnDestroy {

  // state
  list$ = new BehaviorSubject<ITaskItem[]>([]);
  listCount$: Observable<number> = this.list$.pipe(map(x => x.length));

  // subscriptions
  onRefresh$: Subscription;

  // new
  constructor(
    private service: TaskService,
    private userContext: UserContextService,
    private entityProvider: EntityProviderService
  ) {

    // setup subscription
    this.onRefresh$ = combineLatest([
      this.userContext.profile$,
      this.entityProvider.entities$
    ]).subscribe(x => {

      // check if a profile
      if (x) {
        this.refreshData();
      } {
        this.list$.next([]);
      }
    })
  }

  // refresh
  refreshData() {

    // get the data from api
    forkJoin([
      this.service.getForCurrentUser(),
      this.entityProvider.entities$
    ]).subscribe(([tasks, entityTypes]) => {

      // go through each task
      var newTasks = tasks.map(task => {

        // find the entity type
        var entityType = entityTypes.find(typ => typ.entityTypeId == task.entityTypeId);

        // update new description and set new details
        task.description = `${entityType.name} ${task.entityIdentifer} - ${task.description}`;
        task.icon = entityType.icon;
        task.url = `${entityType.rootUrl}/view/${task.entityId}`;

        // return
        return task;
      });

      // push the updated list
      this.list$.next(newTasks);
    });
  }

  // cleanup
  ngOnDestroy(): void {
    this.onRefresh$.unsubscribe();
  }
}
