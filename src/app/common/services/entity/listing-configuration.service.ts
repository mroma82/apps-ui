import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingConfigurationService {  
  
  constructor() { }

  getViews() : Observable<any[]> {
    return of([
      { id: "all", title: "All Examples", filter: { }},
      { id: "active", title: "Active Examples", filter: { status: 1 }}
    ]);
  }

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
      }
    ]);
  }
}
