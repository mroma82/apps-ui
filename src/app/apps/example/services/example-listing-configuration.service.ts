import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable, of } from 'rxjs';
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
      { id: "active", title: "Active Examples", filter: { status: 1 }}      
    ]);
  }

  // columns
  getColumns() : Observable<IEntityListingColumn[]> {
    return of([
      {
        model: "exampleId",
        title: "Example #",
        isLink: true
      },
      {
        model: "title",
        title: "Title"
      },
      {        
        model: "status",
        title: "Status",
        displayFunc: x => {
          switch(x.status) {
            case 0: return "Open";
            case 1: return "Active";
            default: return "Unknown";
          }
        }
      },
      {
        model: "numberField",
        title: "Number"
      },
      {
        model: "requestUser.fullName",
        title: "Requested By"
      },
      {
        model: "department.text",
        title: "Department"
      },
      {
        model: "workflowStateText",
        title: "Workflow Status"
      }
    ]);
  }
}
