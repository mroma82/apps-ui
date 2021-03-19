import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable, of } from 'rxjs';
import { UtcDateTimePipe } from 'src/app/common/pipes/utc-date-time.pipe';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleListingConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews() : Observable<IEntityListingView[]> {
    return of([
      { id: "all", title: "All Examples", filter: { }},
      { id: "open", title: "Open Examples", filter: { status: 0 }},
      { id: "in-progress", title: "In Process Examples", filter: { status: 1 }},
      { id: "completed", title: "Completed Examples", filter: { status: 2 }},
      { id: "finance", title: "Finance Only", filter: { departmentName: "Finance" }}    
    ]);
  }

  // columns
  getColumns() : Observable<IEntityListingColumn[]> {
    var cols : IEntityListingColumn[] = [
      {
        model: "exampleId",
        isLink: true,
        showEditLink: true
      },
      {
        model: "title"
      },
      {        
        model: "status",
        displayFunc: x => {
          switch(x.status) {
            case 0: return "Open";
            case 1: return "In Progress";
            case 2: return "Completed";
            default: return "Unknown";
          }
        }
      },
      {
        model: "numberField"
      },
      {
        model: "requestUser.fullName",
        title: "Requested By",
        isLink: true,
        viewLinkFunc: x => `/app/admin/system-users/view/${x.requestUserId}`
      },
      {
        model: "requestUser.instance.name",
        title: "Requested By Instance"        
      },
      {
        model: "department.text",
        title: "Department"
      },
      {
        model: "workflowStateText"
      },
      {
        model: "createDateTime",
        pipe: new UtcDateTimePipe(new DatePipe("en-us"))
      }
    ];

    return of(cols);
  }
}
