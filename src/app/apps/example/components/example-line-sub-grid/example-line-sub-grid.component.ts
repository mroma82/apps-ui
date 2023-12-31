import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITY_CONFIG } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { EntityValidationService, ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { ExampleLineEntityConfigurationService } from '../../services/example-line-entity-configuration.service';
import { ExampleLineCreateComponent } from '../example-line-create/example-line-create.component';
import { ExampleLineViewEditComponent } from '../example-line-view-edit/example-line-view-edit.component';

@Component({
  selector: 'app-example-line-sub-grid',
  templateUrl: './example-line-sub-grid.component.html',
  styleUrls: ['./example-line-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_CONFIG, useClass: ExampleLineEntityConfigurationService },
    { provide: ENTITY_VALIDATION, useClass: EntityValidationService }
  ]
})
export class ExampleLineSubGridComponent implements OnInit {

  // columns
  cols = [
    { model: 'title', isLink: true },
    { model: 'createDateTime', formatter: 'd' },
    { title: 'Example #', model: 'example.exampleId', isLink: true, viewLinkFunc: x => '/app/example/view/' + x.exampleId },
    { model: 'name' },
    {
      model: 'title',
      title: 'Status',
      displayFunc: x => `<span class="badge badge-warning">${x.title}</span>`,
      isHtml: true
    }
  ];

  // options
  entityTypeId: string = EntityTypes.ExampleLine;

  // state
  viewMode$: Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$: Observable<any> = this.context.entityRecord$;
  mode$: Observable<'view' | 'edit'> = this.context.mode$;

  // sub grid config
  lineSubGridConfig: IEntitySubGridConfigurationService = {
    createFormComponent: ExampleLineCreateComponent,
    editFormComponent: ExampleLineViewEditComponent,
    navigateToEditAfterCreate: false
  };

  // new
  constructor(
    private context: EntityViewEditContextService,
  ) { }

  ngOnInit() {
  }
}
