import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { DialogService } from '../../dialog.service';
import { ListItemService } from '../../list-item.service';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';

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
    private entityConfig: EntityConfigurationService,    
    private listItems: ListItemService,
    private appContext: AppContextService,
    private dialogService: DialogService    
  ) { 

    // status list
    //this.statusList$ = service.getStatusList();
    //this.userList$ = lists.userList$;

    // get params
    /*this.service.getParameters().pipe(tap(x => {
      if(x) {
        this.listItems.getItemsByType(x.statusListTypeId).subscribe(lst => this.statusValueList$.next(lst));
      }
    })).subscribe();            */

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

  /*
  // update 
  update() : Observable<boolean> {
    
    // validate
    if(!this.exampleRecord$.value.customerId) {
      this.dialogService.message("Validation", "Customer is required");
      return of(false);
    }

    // update, check if ok
    return this.service.update({
      example: this.exampleRecord$.value
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
    return this.service.delete(this.id$.value).pipe(map(x => {
      if(x.success) {
        return true;
      } else {
        // todo: show error
        console.log(x.text);
        return false;
      }
    }));
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
