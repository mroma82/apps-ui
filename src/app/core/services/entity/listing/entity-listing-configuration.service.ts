import { Observable, of } from 'rxjs';

// injectiont oken
export const ENTITY_LISTING_CONFIG = "IEntityListingConfigurationService";

// listing config
export interface IEntityListingConfigurationService {  

  // views/columns
  getViews() : Observable<any[]>;
  getColumns() : Observable<any[]>;
}
