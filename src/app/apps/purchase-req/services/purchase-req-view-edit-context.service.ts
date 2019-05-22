import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { AppContextService } from 'src/app/app-context.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqViewEditContextService implements OnDestroy {

  // observables
  id$ = new BehaviorSubject<string>(null);
  reqRecord$ = new BehaviorSubject<any>({});

  // lists
  statusList$: Observable<any>;    
  userList$ : Observable<any>;
  buyerGroupList$ : Observable<any>;
  
  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private api: PurchaseReqApiService,
    private appContext: AppContextService
  ) {   

    // id change
    this.onIdChange$ = this.id$.subscribe(x => {
      if(x)
        this.refreshData();
    });

    // lists
    // status list
    this.statusList$ = of([
      { code: 1, text: "Open" },
      { code: 2, text: "Closed" }
    ]);

    // buyer groups
    this.buyerGroupList$ = of([
      { code: "IT", text: "IT" },
      { code: "Purchasing", text: "Purchasing" },
      { code: "Self", text: "Self" }
    ]);

    // users
    this.userList$ = of([
      { username: "mroma", fullName: "Michael Roma" },
      { username: "mjones", fullName: "Mary Jones" }
    ]);
  }

  // set id
  setId(id: string) {
    this.id$.next(id);
  }
  
  // refresh
  refreshData() {

    // get the data
    this.api.getSingle(this.id$.value).subscribe(x => {
      this.reqRecord$.next(x);

      // set title
      this.appContext.Layout.setTitle("Purchase Requisition: " + x.reqNumber);
    });

    // todo: get lines
  }

  // update 
  update() : Observable<boolean> {
    
    // update, check if ok
    return this.api.update({
      purchaseReq: this.reqRecord$.value
    }).pipe(map(x => {
      if(x.success) {
        return true;
      } else {
        // todo: show error
        console.log(x.text);
        return false;
      }
    }));
  }

  // delete
  delete() : Observable<boolean> {

    // delete, check if ok
    return this.api.delete(this.id$.value).pipe(map(x => {
      if(x.success) {
        return true;
      } else {
        // todo: show error
        console.log(x.text);
        return false;
      }
    }));
  }

  // destroy
  ngOnDestroy() {
    this.onIdChange$.unsubscribe();
  }
}
