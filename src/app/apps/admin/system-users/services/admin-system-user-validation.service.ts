import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';

@Injectable()
export class AdminSystemUserValidationService implements IEntityValidationService {

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
    
    // check if no username
    if(!model.username) {
      return of({
        success: false,
        text: "Username is required"
      });
    }

    // check if no name
    if(!model.fullName) {
      return of({
        success: false,
        text: "Name is required"
      });
    }

    // check if no email
    if(!model.email) {
      return of({
        success: false,
        text: "Email is required"
      });
    }

    // else, ok
    return of({ success: true });
  }
}