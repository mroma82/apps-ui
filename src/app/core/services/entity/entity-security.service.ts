import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { EntityApiService } from './entity-api.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from './entity-configuration.service';

@Injectable()
export class EntitySecurityService {

  // observables
  canView$ = this.entityApi.hasAccess(this.config.entityTypeId, SecurityPermissionMask.View);
  canEdit$ = this.entityApi.hasAccess(this.config.entityTypeId, SecurityPermissionMask.Edit);
  canAdd$ = this.entityApi.hasAccess(this.config.entityTypeId, SecurityPermissionMask.Add);
  canDelete$ = this.entityApi.hasAccess(this.config.entityTypeId, SecurityPermissionMask.Delete);

  // new
  constructor(
    @Inject(ENTITY_CONFIG) private config: IEntityConfigurationService,
    private entityApi: EntityApiService
  ) { }
}
