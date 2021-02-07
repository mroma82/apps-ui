import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class PmParametersValidationService implements IEntityValidationService {

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

    // item type
    if(!model.itemTypeListTypeId) {
      return of({ success: false, text: "Item type is required" });
    }

    // location
    if(!model.locationListTypeId) {
      return of({ success: false, text: "Location is required" });
    }

    return of({ success: true });
  }
}

