import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class PmEventValidationService implements IEntityValidationService {

  // create
  validateCreate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }

  // update
  validateUpdate(model: any): Observable<IValidationResult> {
    return this.validate(model);
  }

  // validate
  validate(model: any): Observable<IValidationResult> {

    // date/time
    if(!model.eventDateTime) {
      return of({ success: false, text: "Event Date is required" });
    }

    return of({ success: true });
  }
}
