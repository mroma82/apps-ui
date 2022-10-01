import { Component, OnInit } from '@angular/core';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { BaseEntitySubGridViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-security-role-entity-edit',
  templateUrl: './admin-security-role-entity-edit.component.html',
  styleUrls: ['./admin-security-role-entity-edit.component.scss']
})
export class AdminSecurityRoleEntityEditComponent extends BaseEntitySubGridViewEditComponent {

  // new
  constructor(
    private viewEditContext: EntitySubGridViewEditContextService
  ) {
    super(viewEditContext);
  }

  // init
  ngOnInit() {

    // list on model change
    this.subs.add(
      this.viewEditContext.model$.subscribe(x => {


      })
    );
  }
}
