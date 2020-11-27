import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class ExampleParametersValidationService implements IEntityValidationService {

  validateCreate(model: any): Observable<IValidationResult> {
    return of({ success: true });
  }

  validateUpdate(model: any): Observable<IValidationResult> {
    return of({ success: true });
  }
}
