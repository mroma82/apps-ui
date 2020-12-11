import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';

@Injectable()
export class AdminSystemUserListConfigurationService implements IEntityListingConfigurationService {

  constructor() { }

  // views
  getViews() : Observable<any[]> {
    return of([
      { 
        id: "all", 
        title: "All System Users", 
        filter: { }, 
        sort: {
          field: "username"
        }
      }
    ]);
  }

  // columns
  getColumns() : Observable<any[]> {
    return of([
      {
        model: "username",
        title: "Username",
        isLink: true
      },
      {
        model: "fullName",
        title: "Name"        
      },
      {
        model: "email",
        title: "Email"        
      }
    ]);
  }
}