import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityRouteResolverService } from 'src/app/common/services/entity-route-resolver.service';
import { take, map } from 'rxjs/operators';
import { TaskContextService } from '../../services/task/task-context.service';
import { ITaskItem } from '../../models/task/task-item';

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss']
})
export class TaskBarComponent implements OnInit {

  // define count 
  count$: Observable<number>;
  list$: Observable<any>;

  constructor(
    private context: TaskContextService,
    private routeResolver: EntityRouteResolverService
  ) {
    this.count$ = context.listCount$;
    this.list$ = context.list$.pipe(map(x => [...x].reverse().slice(0, 20)));
  }

  model = {
    showMenu: false
  }

  // init
  ngOnInit() {

  }

  // show list dialog
  showListDialog() {
    this.context.openListDialog();
    this.model.showMenu = false;
  }
}
