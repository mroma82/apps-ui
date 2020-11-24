import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { IEntityValidationService } from '../entity-validation.service';
import { EntityListingContextService } from '../listing/entity-listing-context.service';

@Injectable({
  providedIn: 'root'
})
export class EntityCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);

  // model
  model = {};

  // new
  constructor(
    private api: EntityApiService,    
    private entityConfig: EntityConfigurationService,
    private listingContext: EntityListingContextService,
    @Optional() @Inject("IEntityValidationService") private entityValidation: IEntityValidationService,    
    private dialogService : DialogService
  ) { }

  // open dialog
  openDialog() {
    this.model = {};
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // create
  create(model: any) {
    
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
}
