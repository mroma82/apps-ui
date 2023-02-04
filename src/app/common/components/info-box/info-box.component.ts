import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityApiService } from '../../../core/services/entity/entity-api.service';
import { AppHttpClientService } from '../../services/app-http-client.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() title: string;

  // entity settings
  @Input() entityTypeId: string;
  @Input() entityTypeFilter: any = {};
  @Input() entityTypeListUrl: string;

  // custom
  @Input() customCountUrl: string;
  @Input() customListUrl: string;
  @Input() customListUrlParams: any;

  // threshold
  @Input() thresholdDanger: number = 99999;
  @Input() thresholdWarning: number = 99999;

  // observables
  count$: Observable<number>;
  listUrl$: Observable<string>;
  listUrlParams$: Observable<any>;
  thresholdClass$: Observable<string>;

  // new
  constructor(
    private entityApi: EntityApiService,
    private http: AppHttpClientService
  ) { }

  // init
  ngOnInit(): void {

    // setup count
    if (!this.customCountUrl) {
      this.count$ = this.getEntityTypeCount();
    } else {
      this.count$ = this.getListCount();
    }

    // setup list
    if (!this.customListUrl) {
      const filterJson = JSON.stringify(this.entityTypeFilter);
      this.listUrl$ = of(this.entityTypeListUrl);
      this.listUrlParams$ = of({ filter: filterJson });
    } else {
      this.listUrl$ = of(this.customListUrl);
      this.listUrlParams$ = of(this.customListUrlParams);
    }

    // check if any threshold
    this.thresholdClass$ = this.count$.pipe(map(x => {

      if (x >= this.thresholdDanger)
        return "bg-danger";

      if (x >= this.thresholdWarning)
        return "bg-warning";

      return "";
    }));
  }

  // build entity type count
  getEntityTypeCount(): Observable<number> {

    // build the model
    const model = {
      entityTypeId: this.entityTypeId,

      filter: {
        ...this.entityTypeFilter
      },

      isWorkflowAssigned: (this.entityTypeFilter.workflowAssigned == true)
    };

    // return the count
    return this.entityApi.list(this.entityTypeId, model).pipe(map(x => x.totalItems));
  }

  // get list count
  getListCount(): Observable<number> {
    return this.http.get(this.customCountUrl);
  }

}
