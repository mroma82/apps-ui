import { Component, OnInit } from '@angular/core';
import { BaseEntitySubGridViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-admin-list-item-view-edit',
  templateUrl: './admin-list-item-view-edit.component.html',
  styleUrls: ['./admin-list-item-view-edit.component.scss']
})
export class AdminListItemViewEditComponent extends BaseEntitySubGridViewEditComponent {

  // new
  constructor(context : EntitySubGridViewEditContextService) {
    super(context);
  }
}
