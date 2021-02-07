import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { BaseEntitySingleRecordViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-single-record-view-edit-component';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';

@Component({
  selector: 'app-example-parameters',
  templateUrl: './example-parameters.component.html',
  styleUrls: ['./example-parameters.component.scss']
})
export class ExampleParametersComponent extends BaseEntitySingleRecordViewEditComponent {
  
  // lists
  listTypes$ : Observable<any>;

  // new
  constructor(
    context : EntitySingleRecordViewEditContextService,
    listItemService : ListItemService
  ) { 
    super(context);

    // types
    this.listTypes$ = listItemService.getTypes().pipe(take(1));
  }  
}
