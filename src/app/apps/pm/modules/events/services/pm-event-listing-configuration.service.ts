import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UtcDateTimePipe } from 'src/app/common/pipes/utc-date-time.pipe';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class PmEventListingConfigurationService implements IEntityListingConfigurationService {

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      { 
        id: "all",
        title: "All Events",
        filter: { },
        sort: {
          field: "eventDateTime"
        }
      },
      { 
        id: "open",
        title: "Open Events",
        filter: { 
          isCompleted: false
        },
        sort: {
          field: "eventDateTime"
        }
      },
      { 
        id: "overdue",
        title: "Overdue Events",
        filter: { 
          isOverdue: true
        },
        sort: {
          field: "eventDateTime"
        }
      },
      { 
        id: "completed",
        title: "Completed Events",
        filter: { 
          isCompleted: true
        },
        sort: {
          field: "eventDateTime",
          isDescending: true
        }
      }
    ]);
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      { model: "pmActivity.pmItem.description", title: "Item", displayFunc: x => x.pmItem.description, isLink: true, viewLinkFunc: x => `/app/preventative-maintenance/items/view/${x.pmActivity.itemId}` },
      { model: "pmActivity.description", title: "Activity", isLink: true, viewLinkFunc: x => `/app/preventative-maintenance/activities/view/${x.activityId}` },
      { model: "eventDateTime", title: "Scheduled date", isLink: true, showEditLink: true, pipe: new UtcDateTimePipe(new DatePipe("en-us")) },
      { model: "isCompleted", title: "Completed?", displayFunc: x => x.isCompleted ? "Yes" : "No" },
      { model: "completedUser.fullName", title: "Completed by" },
      { model: "completedDateTime", title: "Completed on", pipe: new UtcDateTimePipe(new DatePipe("en-us")) },
    ]);
  }
}
