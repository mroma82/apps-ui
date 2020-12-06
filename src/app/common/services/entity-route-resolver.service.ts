import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityRouteResolverService {

  constructor() { }

  // get route for entity type and id
  resolve(entityTypeId: string, entityId: string) : string {

    // check app
    switch(entityTypeId) {

      // example
      case "e1d39dfa-2940-4434-a7e4-2c85d2d2fe47": 
        return `/app/example/view/${entityId}`;
    }

    // else, nothing
    return "";
  }
}
