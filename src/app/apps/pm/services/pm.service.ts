import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';

@Injectable()
export class PmService {

  // new
  constructor(
    private entityApi: EntityApiService
  ) { }

  // get parameters
  getParameters(): Observable<any> {
    return this.entityApi.getSingle(EntityTypes.PmParameters);
  }

  // get status badge
  getStatusBadge(eventItem: any): string {

    // check if overdue
    if (eventItem.extras.isOverdue) {
      return `<span class="badge badge-warning">Overdue</span>`;
    }

    // all else, nothing
    return "";
  }

}
