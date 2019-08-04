import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { PurchaseReqApiService } from './purchase-req-api.service';
import { AppContextService } from 'src/app/app-context.service';
import { map, switchMap } from 'rxjs/operators';
import { PurchaseReqListsService } from './purchase-req-lists.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { message } from 'src/app/common/components/forms/base/validation';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqViewEditContextService implements OnDestroy {

  // observables
  id$ = new BehaviorSubject<string>(null);
  reqRecord$ = new BehaviorSubject<any>({});
  reqLines$ = new BehaviorSubject<any>([]);  
  lineDialogOpen$ = new BehaviorSubject<boolean>(false);
  lineDialogModel$ = new BehaviorSubject<any>({});
  isTemplate$ = new BehaviorSubject<boolean>(false);

  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private api: PurchaseReqApiService,
    private appContext: AppContextService,
    private dialogService: DialogService 
  ) {   
    // id change
    this.onIdChange$ = this.id$.subscribe(x => {
      if(x)
        this.refreshData();
    });
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

      // set template
      this.isTemplate$.next(x.isTemplate);

      // set title
      if(x.isTemplate) {
        this.appContext.Layout.setTitle("Purchase Requisition Template: " + x.reqNumber);
      } else {
        this.appContext.Layout.setTitle("Purchase Requisition: " + x.reqNumber);
      }      
    });

    // get lines
    this.api.getLines(this.id$.value).subscribe(x => {
      this.reqLines$.next(x);      
    });

    // clear line dialog
    this.lineDialogModel$.next({});
    this.lineDialogOpen$.next(false);
  }

  // update 
  update() : Observable<boolean> {
    
    // set line total
    var reqRecord = this.reqRecord$.value;
    reqRecord.lineTotal = this.calcLineTotal();

    // update, check if ok
    return this.api.update({
      purchaseReq: reqRecord,
      purchaseReqLines: this.reqLines$.value
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

  // open line dialog for create
  openLineDialogForCreate() {
    let req = this.reqRecord$.value;
    
    // set the default values and open
    this.lineDialogModel$.next({
      lineIndex: -1,
      itemType: 0,
      quantity: 1,
      unitPrice: 0,
      extPrice: 0,
      uom: 'Each',
      location: req.location,
      department: req.department,
      requiredDate: req.requiredDate,
      isDeleted: false
    });    
    this.lineDialogOpen$.next(true);
  }

  // open line dialog for edit
  openLineDialogForEdit(index: number, line: any) {
    
    // prep edit model
    this.lineDialogModel$.next({      
      ...line,
      ...{ 
        lineIndex: index 
      },
    });
    this.lineDialogOpen$.next(true);
  }

  // validate line
  validateLine(model: any) : boolean {

    // check messages
    let messages : string[] = [];

    // check each
    if(!model.itemId) messages.push("Item # is required");
    if(!model.quantity) messages.push("Quantity is required");
    if(!model.unitPrice) messages.push("Unit Price is required");

    // check ledger account
    if(model.itemType == 1 && !model.ledgerAccount) {
      messages.push("G/L Account is required for non-inventory lines");
    }

    // check error
    if( messages.length) {
      this.dialogService.message("Validation", "The following errors occurred:\n\n" + messages.join('\n'));
      return false;
    }

    // is ok
    return true;
  }

  // add line
  addUpdateLine(model: any) : boolean {

    // validate
    if(!this.validateLine(model)) {
      return false;
    }

    // get the lines
    var lines : any[] = this.reqLines$.value;
    
    // check if we need to add or update
    if(model.lineIndex == -1) {
      lines.push(model);
    } else {      

      // update, get the existing line and update
      var existingLine = lines.filter((line : any) => !line.isDeleted)[model.lineIndex];      
      lines[lines.indexOf(existingLine)] = {...existingLine, ...model};      
    }    
    
    // next the lines
    this.reqLines$.next(lines);

    // close dialog
    this.lineDialogOpen$.next(false);

    // return ok
    return true;
  }

  // delete line
  deleteLine(index: number) {

    // ask
    this.dialogService.yesNo("Delete Line", "Are you sure you want to delete this line?").subscribe(x => {
      if(x == DialogResultEnum.Yes) {

        // get the lines
        var lines = this.reqLines$.value;

        // get the existing line
        var existingLine = lines.filter((line : any) => !line.isDeleted)[index];
        existingLine.isDeleted = true;

        // push a new lines    
        this.reqLines$.next(lines);
      }
    });  
  }

  // calc the line total
  calcLineTotal() : number {
    return this.reqLines$.value
      .filter((line : any) => !line.isDeleted)
      .reduce((sum : number, current : any) => sum + current.extPrice, 0);
  }

  // create from template
  createFromTemplate() {
    return this.api.createFromTemplate(this.reqRecord$.value.id);
  }

  // copy
  copy(isEdit: boolean) : Observable<any> {
    
    // ask first
    return this.dialogService.yesNo("Copy", "Are you sure you want to copy this record?").pipe(switchMap(x => {
      if(x == DialogResultEnum.Yes) {

        // define check/update observable
        let checkUpd$ : Observable<boolean>;
        if(isEdit) {
          checkUpd$ = this.update();
        } else {
          checkUpd$ = of(true);
        }

        // check/update, then copy
        return checkUpd$.pipe(switchMap(updateResult => {          
          if(updateResult) {
            return this.api.copy(this.id$.value);
          }
          return of({ success: false });
        }));
      } else {
        return of({ success: false });
      }
    }));
  }

  // integrate po
  integratePurchaseOrder(isEdit: boolean) : Observable<any> {
    
    // ask first
    return this.dialogService.yesNo("Create/Update Purchase Order", "Are you sure you want to create/update a purchase order for this record").pipe(switchMap(x => {
      if(x == DialogResultEnum.Yes) {

        // define check/update observable
        let checkUpd$ : Observable<boolean>;
        if(isEdit) {
          checkUpd$ = this.update();
        } else {
          checkUpd$ = of(true);
        }

        // check/update, then copy
        return checkUpd$.pipe(switchMap(updateResult => {          
          if(updateResult) {
            return this.api.integratePurchaseOrder(this.id$.value);
          }
          return of({ success: false });
        }));
      } else {
        return of({ success: false });
      }
    }));
  }

  // destroy
  ngOnDestroy() {
    this.onIdChange$.unsubscribe();
  }
}
