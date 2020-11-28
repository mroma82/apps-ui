import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTITY_VALIDATION } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { ExampleLineValidationService } from '../../services/example-line.validation.service';
import { ExampleLineCreateComponent } from '../example-line-create/example-line-create.component';
import { ExampleLineViewEditComponent } from '../example-line-view-edit/example-line-view-edit.component';

@Component({
  selector: 'app-example-line-sub-grid',
  templateUrl: './example-line-sub-grid.component.html',
  styleUrls: ['./example-line-sub-grid.component.scss'],
  providers: [
    { provide: ENTITY_VALIDATION, useClass: ExampleLineValidationService }
  ]
})
export class ExampleLineSubGridComponent implements OnInit {

  // state
  viewMode$ : Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  model$ : Observable<any> = this.context.entityRecord$;
  
  // sub grid config
  lineSubGridConfig : IEntitySubGridConfigurationService = {
    createFormComponent: ExampleLineCreateComponent,
    editFormComponent: ExampleLineViewEditComponent
  };

  // new
  constructor(
    private context: EntityViewEditContextService,
  ) { }

  ngOnInit() {
  }  
}
