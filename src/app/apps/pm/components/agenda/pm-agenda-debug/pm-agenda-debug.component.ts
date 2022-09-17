import { Component, OnInit } from '@angular/core';
import { PmAgendaContextService } from '../../../services/agenda/pm-agenda-context.service';

@Component({
  selector: 'app-pm-agenda-debug',
  templateUrl: './pm-agenda-debug.component.html',
  styleUrls: ['./pm-agenda-debug.component.sass']
})
export class PmAgendaDebugComponent implements OnInit {

  // state
  filter$ = this.context.filter$;
  items$ = this.context.items$;

  // new
  constructor(
    private context: PmAgendaContextService
  ) { }

  ngOnInit(): void {
  }

}
