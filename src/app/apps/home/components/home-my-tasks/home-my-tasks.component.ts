import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITaskItem } from '../../../../foundation/models/task/task-item';
import { TaskContextService } from '../../../../foundation/services/task/task-context.service';

@Component({
  selector: 'app-home-my-tasks',
  templateUrl: './home-my-tasks.component.html',
  styleUrls: ['./home-my-tasks.component.scss']
})
export class HomeMyTasksComponent implements OnInit {

  // observables
  list$: Observable<ITaskItem[]>;

  // new
  constructor(
    private taskContext: TaskContextService
  ) {
    this.list$ = taskContext.list$.pipe(map(x => [...x].reverse().slice(0, 20)));
  }

  // init
  ngOnInit() {
  }

  // open dialog
  openListDialog() {
    this.taskContext.openListDialog();
  }
}
