import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AppContextService } from 'src/app/app-context.service';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ToastMessageContextService } from 'src/app/common/services/toast-message-context.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { ENTITY_VALIDATION, IEntityValidationService } from '../entity-validation.service';
import { EntityListingContextService } from '../listing/entity-listing-context.service';
import { EntitySubGridContextService } from '../sub-grid/entity-sub-grid-context.service';

@Injectable()
export class EntityCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);
  model$ = new BehaviorSubject<any>({});
  
  // new
  constructor(
    private api: EntityApiService,    
    private dialogService : DialogService,
    private entityConfig: EntityConfigurationService,
    private listingContext: EntityListingContextService,      
    private appContext: AppContextService,
    @Optional() private subGridContext : EntitySubGridContextService,      
    @Optional() @Inject(ENTITY_VALIDATION) private entityValidation: IEntityValidationService
  ) { }

  // open dialog
  openDialog() {
    this.clear(); 
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // create
  create() {
    
    // get hte model
    const model = {
      ...this.model$.value
    };

    // check if validation
    let validate : Observable<IValidationResult>;
    if(this.entityValidation) {
      validate = this.entityValidation.validateCreate(model);
    } else {
      validate = of({ success: true });
    }

    // validate
    return validate.pipe(mergeMap(result => {
      if(result.success) {

        // try to create
        return this.api.add(this.entityConfig.entityTypeId, model).pipe(tap(x => {

          // check if ok
          if(x.success) {

            if(this.subGridContext !== null) {
              this.subGridContext.refreshData();
            } else {
              this.listingContext.refreshData();
            }           
            
            // send a toast message
            this.appContext.ToastMessage.add({ text: `${this.entityConfig.name} Created`, url: `${this.entityConfig.rootUrl}/view/${x.id}` });
            return true;
            
          } else {
            this.dialogService.message("Error during create", x.text);
            return false;
          }
        }));

      } else {
        this.dialogService.message("Validation", result.text);        
      }

      return of(false);
    }));
    
  };

  // clear
  clear() {

    // model defeault
    let modelDefault = {};
    if(this.subGridContext) {
      modelDefault = this.subGridContext.modelDefault$.value;
    }

    this.model$.next({
      ...modelDefault
    });
  }
}
