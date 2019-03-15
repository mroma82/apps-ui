import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordContextService {

  // observables
  recordContext$ = new BehaviorSubject<any>({});

  // set record
  setRecordContext(contextType: number, contextId: string) {
    
    // next
    this.recordContext$.next({
      contextType: contextType,
      contextId: contextId
    });
  }


  constructor() { }
}
