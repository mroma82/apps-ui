import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { PmActivityCreateComponent } from '../pm-activity-create/pm-activity-create.component';
import { PmActivityViewEditComponent } from '../pm-activity-view-edit/pm-activity-view-edit.component';

@Component({
  selector: 'app-pm-activity-sub-grid',
  templateUrl: './pm-activity-sub-grid.component.html',
  styleUrls: ['./pm-activity-sub-grid.component.sass']
})
export class PmActivitySubGridComponent implements OnInit {

  // options
  entityTypeId: string = EntityTypes.PmActivity;

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
