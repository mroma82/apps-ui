import { Observable, of } from 'rxjs';

export interface IEntityListingConfigurationService {  

  // views/columns
  getViews() : Observable<any[]>;
  getColumns() : Observable<any[]>;
}
