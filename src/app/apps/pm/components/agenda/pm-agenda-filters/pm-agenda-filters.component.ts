import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PmAgendaFilterModel } from '../../../models/agenda/pm-agenda-filter-model';
import { PmAgendaContextService } from '../../../services/agenda/pm-agenda-context.service';
import { PmListsService } from '../../../services/pm-lists.service';

@Component({
  selector: 'app-pm-agenda-filters',
  templateUrl: './pm-agenda-filters.component.html',
  styleUrls: ['./pm-agenda-filters.component.sass']
})
export class PmAgendaFiltersComponent implements OnInit {

  // state
  model$: Observable<PmAgendaFilterModel> = this.context.filter$;
  locationList$ = this.lists.locationList$;
  itemTypeList$ = this.lists.itemTypeList$;

  // new
  constructor(
    private context: PmAgendaContextService,
    private lists: PmListsService
  ) { }

  // init
  ngOnInit(): void {
  }

  // update filter
  updateFilter(filter: PmAgendaFilterModel) {
    this.context.updateFilter(filter);
  }

  // refresh
  refresh() {
    this.context.updateFilter({});
  }

}
