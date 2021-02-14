import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class PmActivityListingConfigurationService implements IEntityListingConfigurationService {

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      {
        id: "all",
        title: "All Activities",
        filter: {},
        sort: {
          field: "description"
        }
      },
      {
        id: "overdue",
        title: "Overdue Activities",
        filter: {
          isOverdue: true
        },
        sort: {
          field: "description"
        }
      },
      { 
        id: "overdue",
        title: "Overdue Activities",
        filter: { 
          isOverdue: true
        },
        sort: {
          field: "description"
        }
      }
    ]);
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      { model: "pmItem.description", title: "Item", isLink: true, viewLinkFunc: x => `/app/preventative-maintenance/items/view/${x.itemId}` },
      { model: "description", title: "Description", isLink: true, showEditLink: true },
      { model: "schedulingDescription", title: "Schedule" },
      { model: "extras.isOverdue", title: "Status", displayFunc: x => this.getStatusBadge(x) }
    ]);
  }

  // get status badge
  getStatusBadge(activityItem: any): string {

    // check if overdue
    if (activityItem.extras.isOverdue) {
      return `<span class="badge badge-warning">Overdue</span>`;
    }

    // all else, nothing
    return "";
  }
}
