import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ValueAccessorBase } from 'src/app/common/components/forms/base/element-base';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminWorkflowGroupValidationService implements IEntityValidationService {

  // validate
  validate(model: any) : Observable<IValidationResult> {

    // group id required
    if(!model.groupId) {
      return of({
        success: false,
        text: "Group ID is required"
      });
    }

    // if here, ok
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
