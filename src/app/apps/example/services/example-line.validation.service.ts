import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class ExampleLineValidationService implements IEntityValidationService {

  constructor() { }

  // create validation
  validateCreate(model: any): Observable<IValidationResult> {    
    return this.validateAll(model);
  }


  // update validation
  validateUpdate(model: any): Observable<IValidationResult> {
    return this.validateAll(model);
  }

  // validate for create or update
  validateAll(model: any): Observable<IValidationResult> {

    // check if model ok
    // title
    if(!model.title) {      
      return of({
        success: false,
        text: "Title is required"
      });
    }

    // if here, then ok
    return of({ success: true});
  }
}
