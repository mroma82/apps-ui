import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IEntityDefinition } from '../../models/entity/entity-definition';
import { EntityApiService } from './entity-api.service';

@Injectable({
  providedIn: 'root'
})
export class EntityProviderService {
  
  // hack: define list of entities
  entities$ : Observable<IEntityDefinition[]>;

  // new
  constructor(
    private api: EntityApiService
  ) { 

    // set the types
    this.entities$ = this.api.getTypes().pipe(shareReplay());
  }

  // get an entity name
  getEntityName(entityTypeId: string) : Observable<string> {
    return this.entities$.pipe(map(entities => entities.filter(x => x.entityTypeId == entityTypeId)[0].name));
  }  
}
