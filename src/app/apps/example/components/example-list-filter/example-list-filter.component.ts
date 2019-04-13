import { Component, OnInit } from '@angular/core';
import { ExampleListContextService } from '../../services/example-list-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example-list-filter',
  templateUrl: './example-list-filter.component.html',
  styleUrls: ['./example-list-filter.component.scss']
})
export class ExampleListFilterComponent implements OnInit {

  // model
  model: any;

  // observables
  statusList$: Observable<any>;

  // new
  constructor(
    private context: ExampleListContextService
  ) { 
    this.statusList$ = context.statusList$;
  }

  // init
  ngOnInit() {

    // init model
    this.model = this.context.filter$.value;
  }

  // update the filter
  updateFilter() {
    this.context.setFilter(this.model);
  }
}
