import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { ENTITY_CONFIG, IEntityConfigurationService } from './entity-configuration.service';
import { EntityProviderService } from './entity-provider.service';

// injection token
export const ENTITY_VALIDATION = "IEntityValidationService";

// validation interface
export interface IEntityValidationService {

  // validate
  validateCreate(model : any) : Observable<IValidationResult>;
  validateUpdate(model : any) : Observable<IValidationResult>;  
}

// entity validation
@Injectable()
export class EntityValidationService implements IEntityValidationService {

  // new
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig : IEntityConfigurationService,
    private entityProvider : EntityProviderService
  ) { }

  // validate create
  validateCreate(model : any) : Observable<IValidationResult> {
    return this.validateFromEntity(model);
  }

  // validate update
  validateUpdate(model : any) : Observable<IValidationResult> {
    return this.validateFromEntity(model);
  }

  // validate required from entity
  validateFromEntity(model : any) : Observable<IValidationResult> {

    // get the columns
    const cols$ = this.entityProvider.getEntityColumns(this.entityConfig.entityTypeId).pipe(map(x => x.filter(c => c.isRequired)));
    
    // go through the required columns
    return cols$.pipe(map(cols => {

      // go through each
      for(let i = 0; i < cols.length; i++) {
        const col = cols[i];

        // convert the name to the searchable name
        const modelName = col.name.substring(0, 1).toLowerCase() + col.name.substring(1);

        // check if empty
        if(!model[modelName]) {
          return {
            success: false,
            text: `${col.label} is required`
          }
        }
      }

      // if here then ok
      return { success: true };
    }));
  }
}
