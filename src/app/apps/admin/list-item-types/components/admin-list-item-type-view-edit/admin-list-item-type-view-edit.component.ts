import { Component, OnInit } from '@angular/core';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-list-item-type-view-edit',
  templateUrl: './admin-list-item-type-view-edit.component.html',
  styleUrls: ['./admin-list-item-type-view-edit.component.scss']
})
export class AdminListItemTypeViewEditComponent extends BaseEntityViewEditComponent {

  // new
  constructor(
    context : EntityViewEditContextService
  ) {
    super(context);
  }
}
