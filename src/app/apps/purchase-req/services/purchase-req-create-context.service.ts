import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { map } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private api: PurchaseReqApiService,
    private appContext: AppContextService
  ) { }

  // open dialog
  openDialog() {
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // create
  create(model: any) : Observable<any> {

    // set user
    model.requestUserId = this.appContext.User.profile$.value.username;

    // check if no description
    if(!model.description) {
      return of({
        success: false,
        text: "Description is required"
      });
    }

    // return create
    return this.api.create(model).pipe(map(x => { return { success: true, text: x.errorText, id: x }}));      
  };
}
