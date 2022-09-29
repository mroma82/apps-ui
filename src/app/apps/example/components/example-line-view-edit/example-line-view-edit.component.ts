import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseEntitySubGridViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-sub-grid-view-edit-component';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-example-line-view-edit',
  templateUrl: './example-line-view-edit.component.html',
  styleUrls: ['./example-line-view-edit.component.scss']
})
export class ExampleLineViewEditComponent extends BaseEntitySubGridViewEditComponent {

  // observables
  mode$;

  // new
  constructor(
    context: EntitySubGridViewEditContextService
  ) {
    super(context);

    this.mode$ = context.mode$;
  }
}
