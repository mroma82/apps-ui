import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from '../entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { ENTITY_VALIDATION, IEntityValidationService } from '../entity-validation.service';

@Injectable()
export class EntitySingleRecordViewEditContextService {

  // observables  
  model$ = new BehaviorSubject<any>({});
  
  // new
  constructor(
    private api: EntityApiService,    
    private dialogService: DialogService,
    private entityConfig: EntityConfigurationService,
    @Optional() @Inject(ENTITY_VALIDATION) private entityValidation: IEntityValidationService
  ) { }

  // refresh
  refresh() {

    // get the data
    this.api.getSingle(this.entityConfig.entityTypeId).subscribe(model => 
      this.model$.next(model)
    );
  }

  // update
  update() {
        
    // get hte model
    const model = { ...this.model$.value };

    // check if validation
    let validate : Observable<IValidationResult>;
    if(this.entityValidation) {
      validate = this.entityValidation.validateUpdate(model);
    } else {
      validate = of({ success: true });
    }

    // validate
    return validate.pipe(mergeMap(result => {
      if(result.success) {

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
        this.dialogService.message("Validation", result.text);        
      }

      return of(false);
    }));
    
  };
}
