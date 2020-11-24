import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { IEntityValidationService } from '../entity-validation.service';
import { EntityListingContextService } from '../listing/entity-listing-context.service';

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
    @Inject("IEntityListingContextService") private listingContext: EntityListingContextService,            
    @Optional() @Inject("IEntityValidationService") private entityValidation: IEntityValidationService
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
    const model = this.model$.value;

    // check if validation
    let validate : Observable<IValidationResult>;
    if(this.entityValidation) {
      validate = this.entityValidation.validateCreate(model);
    } else {
      validate = of({ success: true });
    }

    // validate
    return validate.pipe(mergeMap(x => {
      if(x.success) {

        // try to create
        return this.api.add(this.entityConfig.entityTypeId, model).pipe(tap(x => {

          // check if ok
          if(x.success) {
            this.listingContext.refreshData();
            return true;
          } else {
            this.dialogService.message("Error during create", x.text);
            return false;
          }
        }));

      } else {
        this.dialogService.message("Validation", x.text);        
      }

      return of(false);
    }));
    
  };

  // clear
  clear() {
    this.model$.next({});
  }
}