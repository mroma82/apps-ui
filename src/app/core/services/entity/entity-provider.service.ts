import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEntityDefinition } from '../../models/entity/entity-definition';

@Injectable({
  providedIn: 'root'
})
export class EntityProviderService {
  
  // hack: define list of entities
  entities$ : Observable<IEntityDefinition[]> = of([
    { 
      entityTypeId: "e1d39dfa-2940-4434-a7e4-2c85d2d2fe47",
      name: "Example",
      pluralName: "Examples"      
    },
    { 
      entityTypeId: "d790dfde-8ac0-439a-9302-ee8ca897a75e",
      name: "Example Line",
      pluralName: "Example Lines"      
    },
    { 
      entityTypeId: "d6b351f0-618e-47cc-8eea-35cf3534d1fa",
      name: "Example Parameters",
      pluralName: "Example Parameters"      
    },
    { 
      entityTypeId: "2d5c70e5-82a9-400e-8528-a10adf0972ba",
      name: "Security Role",
      pluralName: "Security Roles"      
    },
    { 
      entityTypeId: "64d60018-908c-4e7d-8e2c-a9ebad36c665",
      name: "Security Role Entity",
      pluralName: "Security Role Entities"      
    },
  ]);

  constructor() { }

  // get an entity name
  getEntityName(entityTypeId: string) : Observable<string> {
    return this.entities$.pipe(map(entities => entities.filter(x => x.entityTypeId == entityTypeId)[0].name));
  }  
}
