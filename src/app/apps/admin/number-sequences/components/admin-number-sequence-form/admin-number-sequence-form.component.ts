import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IEntityDefinition } from '../../../../../core/models/entity/entity-definition';
import { EntityProviderService } from '../../../../../core/services/entity/entity-provider.service';
import { EntityViewEditContextService } from '../../../../../core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-number-sequence-form',
  templateUrl: './admin-number-sequence-form.component.html',
  styleUrls: ['./admin-number-sequence-form.component.sass']
})
export class AdminNumberSequenceFormComponent implements OnInit {
  @Input() model : any;
  
  // lists
  entityList$ : Observable<IEntityDefinition[]> = this.entityProvider.entities$.pipe(shareReplay());
  
  // new
  constructor(
    private entityProvider : EntityProviderService    
  )
  {    
  }

  // init
  ngOnInit() {}
}
