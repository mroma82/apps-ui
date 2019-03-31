import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextTypeRouteResolverService {

  constructor() { }

  // get route for context type and id
  resolve(contextType: number, contextId: string) : string {

    // check app
    switch(contextType) {

      // example
      case 1: 
        return `/app/example/view/${contextId}`;
    }

    // else, nothing
    return "";
  }
}
