import { Observable, of } from 'rxjs';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { IEntityListingView } from 'src/app/core/models/entity/entity-listing-view';

// injectiont oken
export const ENTITY_LISTING_CONFIG = "IEntityListingConfigurationService";

// listing config
export interface IEntityListingConfigurationService {  

  // views/columns
  getViews() : Observable<IEntityListingView[]>;
  getColumns() : Observable<IEntityListingColumn[]>;
}
