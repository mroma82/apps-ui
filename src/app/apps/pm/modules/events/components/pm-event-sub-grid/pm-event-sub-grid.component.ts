import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { PmEventEntityConfigurationService } from '../../services/pm-event-entity-configuration.service';
import { PmEventValidationService } from '../../services/pm-event-validation.service';
import { PmEventCreateComponent } from '../pm-event-create/pm-event-create.component';
import { PmEventSubGridViewEditComponent } from '../pm-event-sub-grid-view-edit/pm-event-sub-grid-view-edit.component';

@Component({
  selector: 'app-pm-event-sub-grid',
  templateUrl: './pm-event-sub-grid.component.html',
  styleUrls: ['./pm-event-sub-grid.component.sass'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: PmEventEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: PmEventValidationService }
  ]
})
export class PmEventSubGridComponent implements OnInit {

  // columns
  cols = [
    { model: "eventDateTime", title: "Scheduled date", isViewLink: true, formatter: "d" },
    { model: "isCompleted", title: "Completed?", displayFunc: x => x.isCompleted ? "Yes" : "No" },
    { model: "completedUserId", title: "Completed by", displayFunc: x => x.completedUser?.fullName },
    { model: "completedDateTime", title: "Completed on", formatter: "d" }
  ];

  // options
  entityTypeId: string = EntityTypes.PmEvent;

  // state
  viewMode$: Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$: Observable<any> = this.context.entityRecord$;
  mode$: Observable<'view' | 'edit'> = this.context.mode$;

  // sub grid config
  lineSubGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: PmEventCreateComponent,
    editFormComponent: PmEventSubGridViewEditComponent
  };

  // new
  constructor(
    private context: EntityViewEditContextService,
  ) { 
  }

  ngOnInit() {
  }

}
