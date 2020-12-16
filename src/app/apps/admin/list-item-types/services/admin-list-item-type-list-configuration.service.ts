import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminListItemTypeListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      {
        id: "all",
        title: "All Drop Down Lists",
        filter: {},
        sort: {
          field: "description"
        }
      }
    ])
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      {
        model: "description",
        title: "Description",
        isLink: true
      }
    ])
  }
}
