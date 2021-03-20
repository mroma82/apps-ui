import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminSecurityRolesListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews() : Observable<IEntityListingView[]> {
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
  getColumns() : Observable<IEntityListingColumn[]> {
    return of([
      {
        model: "name",
        isLink: true,
        showEditLink: true
      },
      {
        model: "isSysAdmin",
        displayFunc: x => x.isSysAdmin ? "Yes" : "No"
      }
    ]);
  }
}