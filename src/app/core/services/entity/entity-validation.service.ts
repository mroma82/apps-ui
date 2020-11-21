import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEntityValidationService {

  // validate
  validateCreate(model : any) : Observable<boolean>;
  validateUpdate(model : any) : Observable<boolean>;  
}
