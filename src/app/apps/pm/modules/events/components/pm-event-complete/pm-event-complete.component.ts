import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserContextService } from '../../../../../../common/services/user-context.service';
import { PmListsService } from '../../../../services/pm-lists.service';

@Component({
  selector: 'app-pm-event-complete',
  templateUrl: './pm-event-complete.component.html',
  styleUrls: ['./pm-event-complete.component.scss']
})
export class PmEventCompleteComponent implements OnInit {
  @Input() model: any;

  // lists
  userList$: Observable<any>;

  // new
  constructor(
    lists: PmListsService
  ) {

    // set the lists
    this.userList$ = lists.userList$;
  }

  ngOnInit(): void {
  }
}
