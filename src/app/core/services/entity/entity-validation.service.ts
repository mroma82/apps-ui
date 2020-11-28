import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IValidationResult } from 'src/app/common/models/validation-result';

// injection token
export const ENTITY_VALIDATION = "IEntityValidationService";

// validation interface
export interface IEntityValidationService {

  // validate
  validateCreate(model : any) : Observable<IValidationResult>;
  validateUpdate(model : any) : Observable<IValidationResult>;  
}
