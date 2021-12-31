import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminSystemUserListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      {
        id: "all",
        title: "All System Users",
        filter: {},
        sort: {
          field: "username"
        }
      },
      {
        id: "licensed",
        title: "All System Users with License Allocated",
        filter: {
          isLicenseAllocated: true
        },
        sort: {
          field: "username"
        }
      }
    ]);
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      {
        model: "username",
        isLink: true,
        showEditLink: true
      },
      {
        model: "fullName"
      },
      {
        model: "email"
      },
      {
        model: "isLicenseAllocated",
        displayFunc: x => x.isLicenseAllocated ? "Yes" : "No"
      }
    ]);
  }
}