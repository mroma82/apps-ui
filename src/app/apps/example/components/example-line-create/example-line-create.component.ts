import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseEntityCreateComponent } from 'src/app/core/services/entity/abstractions/base-entity-create-component';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-example-line-create',
  templateUrl: './example-line-create.component.html',
  styleUrls: ['./example-line-create.component.scss']
})
export class ExampleLineCreateComponent extends BaseEntityCreateComponent {

  // new
  constructor(
    context: EntityCreateContextService
  ) {
    super(context);
  }
}
