import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntityApiService } from 'src/app/common/services/entity/entity-api.service';
import { EntityConfigurationService } from 'src/app/common/services/entity/entity-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class EntityCreateContextService {

  // observables
  dialogOpen$ = new BehaviorSubject<boolean>(false);

  // new
  constructor(
    private api: EntityApiService,
    private entityConfig: EntityConfigurationService
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
  create(model: any) : Observable<any> {
    return this.api.create(this.entityConfig.entityTypeId, model);
  };
}
