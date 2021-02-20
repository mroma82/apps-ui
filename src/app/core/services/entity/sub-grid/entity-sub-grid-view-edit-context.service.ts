import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IValidationResult } from 'src/app/common/models/validation-result';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from '../entity-api.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../entity-configuration.service';
import { ENTITY_VALIDATION, IEntityValidationService } from '../entity-validation.service';
import { EntityListingContextService } from '../listing/entity-listing-context.service';
import { EntitySubGridContextService } from './entity-sub-grid-context.service';

@Injectable()
export class EntitySubGridViewEditContextService {

  // observables  
  mode$ = new BehaviorSubject<'view' | 'edit'>("view");
  dialogOpen$ = new BehaviorSubject<boolean>(false);
  model$ = new BehaviorSubject<any>({});
  
  // new
  constructor(
    private api: EntityApiService,    
    private dialogService : DialogService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private listingContext: EntityListingContextService,      
    @Optional() private subGridContext : EntitySubGridContextService,      
    @Optional() @Inject(ENTITY_VALIDATION) private entityValidation: IEntityValidationService
  ) { }

  // open dialog
  openDialog(mode : 'view' | 'edit', id: string) {
    
    // clear
    this.clear();

    // setup this dialog
    this.mode$.next(mode);
    
    // get the data
    this.api.getSingleById(this.entityConfig.entityTypeId, id).subscribe(x => {      
      this.model$.next(x);
      this.dialogOpen$.next(true);
    });
  } 

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
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
    return validate.pipe(mergeMap(x => {
      if(x.success) {

        // try to create
        return this.api.update(this.entityConfig.entityTypeId, model).pipe(tap(x => {

          // check if ok
          if(x.success) {

            if(this.subGridContext !== null) {
              this.subGridContext.refreshData();
            } else {
              this.listingContext.refreshData();
            }            
            return true;
            
          } else {
            this.dialogService.message("Error during update", x.text);
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
