import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminSecurityRolesEntityValidationService implements IEntityValidationService {

  constructor() { }

  // create
  validateCreate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }

  // update
  validateUpdate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }

  // validate
  validate(model: any) : Observable<IValidationResult> {
    console.log(model);
    // check if no name
    if(!model.entityTypeId) {
      return of({
        success: false,
        text: "Entity is required"
      });
    }

    // else, ok
    return of({ success: true });
  }
}

