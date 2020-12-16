import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminListItemValidationService implements IEntityValidationService {

  constructor() { }

  // validation
  validate(model: any) : Observable<IValidationResult> {
    
    // required
    if(!model.valueId) {
      return of({
        success: false,
        text: "Value is required"
      });
    }

    if(!model.text) {
      return of({
        success: false,
        text: "Text is required"
      });
    }

    // return ok
    return of({ 
      success: true
    });
  }

  // create
  validateCreate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }
  
  // update
  validateUpdate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }
}
