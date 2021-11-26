import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntityRouteResolverService } from 'src/app/common/services/entity-route-resolver.service';
import { TaskContextService } from '../../services/task/task-context.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  // list
  list: any[];

  // subscriptions
  onListChange: Subscription;

  // new
  constructor(
    private context: TaskContextService
  ) {
    // subscribe
    this.onListChange = this.context.list$.subscribe(x => {
      this.list = [...x].reverse();
    })
  }

  // close dialog
  closeDialog() {
    this.context.closeListDialog();
  }

  // init
  ngOnInit() {
  }

  // clean up
  ngOnDestroy(): void {
    this.onListChange.unsubscribe();
  }
}
