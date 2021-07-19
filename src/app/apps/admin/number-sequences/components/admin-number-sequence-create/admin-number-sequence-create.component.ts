import { Component, OnInit } from '@angular/core';
import { BaseEntityCreateComponent } from '../../../../../core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from '../../../../../core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-number-sequence-create',
  templateUrl: './admin-number-sequence-create.component.html',
  styleUrls: ['./admin-number-sequence-create.component.sass']
})
export class AdminNumberSequenceCreateComponent extends BaseEntityCreateComponent {  
  
  // new
  constructor(    
    entityCreateContext: EntityCreateContextService
  )
  {
    super(entityCreateContext);
  }
}

