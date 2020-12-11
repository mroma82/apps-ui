import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminSecurityRolesListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews() : Observable<any[]> {
    return of([
      { 
        id: "all", 
        title: "All Security Roles", 
        filter: { }, 
        sort: {
          field: "name"
        }
      }
    ]);
  }

  // columns
  getColumns() : Observable<any[]> {
    return of([
      {
        model: "name",
        title: "Name",
        isLink: true
      },
      {
        model: "isSysAdmin",
        title: "Is System Administrator Role",
        displayFunc: x => x.isSysAdmin ? "Yes" : "No"
      }
    ]);
  }
}