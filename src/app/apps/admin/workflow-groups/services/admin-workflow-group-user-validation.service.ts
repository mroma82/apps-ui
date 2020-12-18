import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminWorkflowGroupUserValidationService implements IEntityValidationService {

  // validate
  validate(model: any): Observable<IValidationResult> {

    // user
    if(!model.systemUserId) {
      return of({
        success: false,
        text: "You must select a User"
      });
    }

    // ok
    return of({ success: true });
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
