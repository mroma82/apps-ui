import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IListingConfigurationService } from 'src/app/common/services/entity/listing-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleListingConfigurationService implements IListingConfigurationService {

  constructor() { }

  // views
  getViews() : Observable<any[]> {
    return of([
      { id: "all", title: "All Examples", filter: { }},
      { id: "open", title: "Open Examples", filter: { status: 0 }},
      { id: "active", title: "Active Examples", filter: { status: 1 }}      
    ]);
  }

  // columns
  getColumns() : Observable<any[]> {
    return of([
      {
        model: "exampleId",
        title: "Example #",
        isLink: true
      },
      {
        model: "title"
      },
      {
        model: "status",
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
        model: "statusValue",
        title: "Status (Value)"
      }
    ]);
  }
}
