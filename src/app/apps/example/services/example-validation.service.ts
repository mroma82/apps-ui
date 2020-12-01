import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class ExampleValidationService implements IEntityValidationService {

  constructor() { }

  // create validation
  validateCreate(model: any): Observable<IValidationResult> {
    
    // check if model ok
    if(!model.title) {      
      return of({
        success: false,
        text: "Title is required"
      });
    }

    // if here, then ok
    return of({ success: true});    
  }


  // update validation
  validateUpdate(model: any): Observable<IValidationResult> {

    // check if model ok
    // title
    if(!model.title) {      
      return of({
        success: false,
        text: "Title is required"
      });
    }

    // customer name
    if(!model.customerName) {      
      return of({
        success: false,
        text: "Customer name is required"
      });
    }

    // if here, then ok
    return of({ success: true});
  }
}
