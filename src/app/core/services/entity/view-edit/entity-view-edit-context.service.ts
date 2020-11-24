import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { tap, map, switchMap, mergeMap } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { DialogService } from '../../../../common/services/dialog.service';
import { ListItemService } from '../../../../common/services/list-item.service';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { IEntityValidationService } from '../entity-validation.service';

@Injectable()
export class EntityViewEditContextService {

  // observables
  id$ = new BehaviorSubject<string>(null);
  mode$ = new BehaviorSubject<"view" | "edit" | null>(null);
  entityRecord$ = new BehaviorSubject<any>({});

  // lists
  userList$: Observable<any>;
  statusList$: Observable<any>;
  statusValueList$ = new BehaviorSubject<any>([]);

  // subscriptions
  onIdChange$: Subscription;

  // new
  constructor(
    private api: EntityApiService,
    private appContext: AppContextService,
    private dialogService: DialogService,
    private entityConfig: EntityConfigurationService,    
    @Optional() @Inject("IEntityValidationService") private entityValidation: IEntityValidationService    
  ) { 
    
    // id change
    this.onIdChange$ = this.id$.subscribe(x => {
      if(x)
        this.refreshData();
    })
  }

  // set id
  setId(id: string) {
    this.id$.next(id);
  }

  // set mode
  setMode(mode: "view" | "edit" | null) {
    this.mode$.next(mode);
  }
   
  // refresh
  refreshData() {

    // get the data
    this.api.getSingle(this.entityConfig.entityTypeId, this.id$.value).subscribe(x => {
      this.entityRecord$.next(x);

      // set title
      this.appContext.Layout.setTitle(`Record: ${this.mode$.value} ${x.exampleId}`);
    });
  }

  
  // update 
  update() : Observable<boolean> {
    
    // get the model
    const model = this.entityRecord$.value;
  
    // check if validation
    let validate : Observable<IValidationResult>;
    if(this.entityValidation) {
      validate = this.entityValidation.validateUpdate(model);
    } else {
      validate = of({ success: true });
    }

    // validate
    return validate.pipe(mergeMap(x => {
      if(x.success) {
        
        // try to create
        return this.api.update(this.entityConfig.entityTypeId, model).pipe(tap(x => {

          // check if ok
          if(x.success) {            
            return true;
          } else {
            this.dialogService.message("Error during update", x.text);
            return false;
          }
        }));

      } else {
        this.dialogService.message("Validation", x.text);        
      }

      // no
      return of(false);
    }));         
  }

  // delete
  delete() : Observable<boolean> {

    // delete, check if ok
    return this.api.delete(this.entityConfig.entityTypeId, this.id$.value).pipe(map(x => {
      if(x.success) {
        return true;
      } else {        
        this.dialogService.message("Error during delete", x.text);
        return false;
      }
    }));
  }
/*
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
          console.log(["updateResult", updateResult])
          if(updateResult) {
            return this.service.copy(this.id$.value);
          }
          return of({ success: false });
        }));
      } else {
        return of({ success: false });
      }
    }));
  }
  */

  // destroy
  ngOnDestroy() {
    // clean up
  }
}
