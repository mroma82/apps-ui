import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { ExampleService } from './example.service';
import { map, shareReplay, tap, switchMap } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { ExampleListsService } from './example-lists.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Injectable({
  providedIn: 'root'
})
export class ExampleViewEditContextService implements OnDestroy {
    
    
  // new
  constructor(
    private service: ExampleService,
    private listItems: ListItemService,
    private appContext: AppContextService,
    private entityContext : EntityViewEditContextService,
    private dialogService: DialogService    
  ) { 
    
  }

  // copy
  copy(isEdit: boolean) : Observable<any> {
    
    // ask first
    return this.dialogService.yesNo("Copy", "Are you sure you want to copy this record?").pipe(switchMap(x => {
      if(x == DialogResultEnum.Yes) {

        // define check/update observable
        let checkUpd$ : Observable<boolean>;
        if(isEdit) {
          checkUpd$ = this.entityContext.update();
        } else {
          checkUpd$ = of(true);
        }

        // check/update, then copy
        return checkUpd$.pipe(switchMap(updateResult => {          
          if(updateResult) {
            return this.service.copy(this.entityContext.id$.value);
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
    // clean up
  }
}
