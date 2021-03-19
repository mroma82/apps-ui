import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { IEntityColumnDefinition } from '../../models/entity/entity-column-definition';
import { IEntityDefinition } from '../../models/entity/entity-definition';
import { EntityApiService } from './entity-api.service';

@Injectable({
  providedIn: 'root'
})
export class EntityProviderService {
  
  // define list of entities
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

  // get entity
  getEntity(entityTypeId: string) : Observable<IEntityDefinition> {
    return this.entities$.pipe(map(x => x.find(x => x.entityTypeId == entityTypeId)));
  }

  // get entity columns
  getEntityColumns(entityTypeId: string) : Observable<IEntityColumnDefinition[]> {
    return this.getEntity(entityTypeId).pipe(map(x => x.columns));
  }

  // get an entity column
  getEntityColumn(entityTypeId: string, name: string) : Observable<IEntityColumnDefinition> {

    // convert the name to the searchable name
    const searchName = name.substring(0, 1).toUpperCase() + name.substring(1);

    // get from the entity
    return this.getEntity(entityTypeId).pipe(map(x => {
      var find = x.columns.filter(c => c.name == searchName);
      if(find.length) {
        return find[0];
      }
      return null;
    }));    
  }

  // has audit trail
  hasAuditTrail(entityTypeId: string) : Observable<boolean> {
    return this.getEntity(entityTypeId).pipe(map(x => x ? x.hasAuditTrail : false));
  }
}
