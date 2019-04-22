import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { DialogResultEnum } from '../types/dialogs/dialog-result.enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // state
  yesNoDialog$ = new Subject<any>()
  yesNoDialogOpenClose$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
  ) {     
  }

  // yes/no dialog
  yesNo(title: string, message: string) : Observable<DialogResultEnum> {    
    
    let subject = new Subject<DialogResultEnum>();

    // setup dialog
    this.yesNoDialog$.next({
      title: title,
      message: message,
      result: subject
    });
        
    // open dialog
    this.yesNoDialogOpenClose$.next(true);
    
    // return subject
    return subject;    
  }
}
