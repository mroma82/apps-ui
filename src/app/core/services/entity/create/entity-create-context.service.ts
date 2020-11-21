import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from 'src/app/common/services/dialog.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { EntityConfigurationService } from '../entity-configuration.service';
import { EntityListingContextService } from '../listing/entity-listing-context.service';

@Injectable({
  providedIn: 'root'
})
export class EntityCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private api: EntityApiService,    
    private entityConfig: EntityConfigurationService,
    private listingContext: EntityListingContextService,
    private dialogService : DialogService
  ) { }

  // open dialog
  openDialog() {
    this.dialogOpen$.next(true);
  }

  // close dialog
  closeDialog() {
    this.dialogOpen$.next(false);
  }

  // create
  create(model: any) {
    
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
  };
}
