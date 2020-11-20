import { Observable, of } from 'rxjs';

export interface IListingConfigurationService {  

  // views/columns
  getViews() : Observable<any[]>;
  getColumns() : Observable<any[]>;
}
