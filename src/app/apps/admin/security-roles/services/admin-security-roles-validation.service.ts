import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminSecurityRolesValidationService implements IEntityValidationService {

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
    
    // check if no name
    if(!model.name) {
      return of({
        success: false,
        text: "Name is required"
      });
    }

    // else, ok
    return of({ success: true });
  }
}
