import { Component, OnInit } from '@angular/core';
import { AppContextService } from '../../../../app-context.service';
import { PmEventCompleteContextService } from '../../modules/events/services/pm-event-complete-context.service';
import { PmAgendaContextService } from '../../services/agenda/pm-agenda-context.service';

@Component({
  selector: 'app-pm-agenda-page',
  templateUrl: './pm-agenda-page.component.html',
  styleUrls: ['./pm-agenda-page.component.sass'],
  providers: [
    PmAgendaContextService,
    PmEventCompleteContextService
  ]
})
export class PmAgendaPageComponent implements OnInit {

  // new
  constructor(
    private appContext: AppContextService
  ) { }

  // init
  ngOnInit(): void {

    // title
    this.appContext.Layout.setTitle("Agenda");
  }

}
