import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IEntityDefinition } from 'src/app/core/models/entity/entity-definition';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';

@Component({
  selector: 'app-admin-security-role-entity-create',
  templateUrl: './admin-security-role-entity-create.component.html',
  styleUrls: ['./admin-security-role-entity-create.component.scss']
})
export class AdminSecurityRoleEntityCreateComponent extends BaseEntityCreateComponent {

  // lists
  entityList$ : Observable<IEntityDefinition[]> = this.entityProvider.entities$.pipe(shareReplay());
  
  // new
  constructor(
    private entityProvider : EntityProviderService,
    entityCreateContext: EntityCreateContextService
  )
  {
    super(entityCreateContext);
  }
}
