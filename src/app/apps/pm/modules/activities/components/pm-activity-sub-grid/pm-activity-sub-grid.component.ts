import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { IEntityColumnDefinition } from '../../../../../../core/models/entity/entity-column-definition';
import { PmActivityEntityConfigurationService } from '../../services/pm-activity-entity-configuration.service';
import { PmActivityValidationService } from '../../services/pm-activity-validation.service';
import { PmActivityCreateComponent } from '../pm-activity-create/pm-activity-create.component';
import { PmActivityViewEditComponent } from '../pm-activity-view-edit/pm-activity-view-edit.component';

@Component({
  selector: 'app-pm-activity-sub-grid',
  templateUrl: './pm-activity-sub-grid.component.html',
  styleUrls: ['./pm-activity-sub-grid.component.sass'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: PmActivityEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: PmActivityValidationService }
  ]
})
export class PmActivitySubGridComponent implements OnInit {

  // options
  entityTypeId: string = EntityTypes.PmActivity;

  // columns
  columns = [
    {
      title: 'Description', model: 'description',
      isLink: true,
      viewLinkFunc: x => '/app/preventative-maintenance/activities/view/' + x.id,
      editLinkFunc: x => '/app/preventative-maintenance/activities/view/' + x.id
    },
    { model: 'schedulingDescription', title: 'Schedule' }
  ];

  // state
  viewMode$: Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$: Observable<any> = this.context.entityRecord$;
  mode$: Observable<'view' | 'edit'> = this.context.mode$;

  // sub grid config
  lineSubGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: PmActivityCreateComponent,
    editFormComponent: PmActivityViewEditComponent
  };

  // new
  constructor(
    private context: EntityViewEditContextService,
  ) { }

  ngOnInit() {
  }
}
