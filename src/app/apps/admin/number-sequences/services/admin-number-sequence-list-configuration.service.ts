import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminNumberSequenceListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      {
        id: "all",
        title: "All Number Sequences",
        filter: {},
        sort: {
          field: "createDateTime"
        }
      }
    ])
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      {
        model: "entityType.name",
        title: "Entity Type",
        isLink: true,
        showEditLink: true
      },
      {
        model: "format"
      },
      {
        model: "nextNumber"
      }
    ])
  }
}
