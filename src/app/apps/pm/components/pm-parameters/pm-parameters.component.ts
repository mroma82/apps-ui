import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';

@Component({
  selector: 'app-pm-parameters',
  templateUrl: './pm-parameters.component.html',
  styleUrls: ['./pm-parameters.component.sass']
})
export class PmParametersComponent implements OnInit {

  // define state
  model$ : Observable<any> = this.context.model$;

  // lists
  listTypes$ : Observable<any>;

  // new
  constructor(
    private context : EntitySingleRecordViewEditContextService,
    listItemService : ListItemService
  ) { 
    
    // types
    this.listTypes$ = listItemService.getTypes().pipe(take(1));
  }

  ngOnInit() {
  }
}
