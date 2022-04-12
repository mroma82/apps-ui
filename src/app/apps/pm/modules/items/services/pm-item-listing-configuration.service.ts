import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { PmService } from '../../../services/pm.service';

@Injectable()
export class PmItemListingConfigurationService implements IEntityListingConfigurationService {

  // new
  constructor(private pmService: PmService) { }

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      {
        id: "all",
        title: "All Items",
        filter: {},
        sort: {
          field: "description"
        }
      },
      {
        id: "overdue",
        title: "Overdue Items",
        filter: {
          isOverdue: true
        },
        sort: {
          field: "description"
        }
      }
    ]);
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    return of([
      { model: "description", title: "Description", isLink: true, showEditLink: true },
      { model: "itemType.text", title: "Type" },
      { model: "location.text", title: "Location" },
      { model: "extras.isOverdue", title: "Status", displayFunc: x => this.pmService.getStatusBadge(x), isHtml: true }
    ]);
  }
}
