import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordContextService {

  // observables
  record$ = new BehaviorSubject<any>({});

  // set record
  setRecord(entityTypeId: string, entityId: string) {
    
    // next
    this.record$.next({
      entityTypeId: entityTypeId,
      entityId: entityId
    });
  }


  constructor() { }
}
