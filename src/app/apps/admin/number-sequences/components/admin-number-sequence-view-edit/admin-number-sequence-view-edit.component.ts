import { Component, OnInit } from '@angular/core';
import { BaseEntityViewEditComponent } from '../../../../../core/services/entity/abstractions/base-entity-view-edit-component';
import { EntityViewEditContextService } from '../../../../../core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-number-sequence-view-edit',
  templateUrl: './admin-number-sequence-view-edit.component.html',
  styleUrls: ['./admin-number-sequence-view-edit.component.sass']
})
export class AdminNumberSequenceViewEditComponent extends BaseEntityViewEditComponent {
  
  // new
  constructor(  
    entityViewEditContext: EntityViewEditContextService
  )
  {
    super(entityViewEditContext);
  }
}
