import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminWorkflowGroupListConfigurationService implements IEntityListingConfigurationService {

  // views
  getViews(): Observable<IEntityListingView[]> {
    return of([
      { 
        id: "all",
        title: "All Workflow Groups",
        filter: {},
        sort: {
          field: "groupId"
        }
      }
    ]);
  }

  // columns
  getColumns(): Observable<IEntityListingColumn[]> {
    
    // cols
    const cols : IEntityListingColumn[] = [
      { title: "Group ID", model: "groupId", isLink: true, showEditLink: true }
    ]; 

    return of(cols);
  }
}
