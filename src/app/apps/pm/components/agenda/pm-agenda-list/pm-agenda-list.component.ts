import { Component, OnInit } from '@angular/core';
import { PmEventCompleteContextService } from '../../../modules/events/services/pm-event-complete-context.service';
import { PmAgendaContextService } from '../../../services/agenda/pm-agenda-context.service';

@Component({
  selector: 'app-pm-agenda-list',
  templateUrl: './pm-agenda-list.component.html',
  styleUrls: ['./pm-agenda-list.component.sass']
})
export class PmAgendaListComponent implements OnInit {

  // state
  items$ = this.context.items$;

  // new
  constructor(
    private context: PmAgendaContextService,
    private eventCompleteContext: PmEventCompleteContextService
  ) { }

  ngOnInit(): void {
  }

  // open complete
  openCompleteDialog(event: any) {
    this.eventCompleteContext.open(event);
  }
}
