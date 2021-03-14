import { Component, Inject, Input, OnInit } from '@angular/core';
import { FORM_COLUMN_PROVIDER } from 'src/app/common/services/form-column-provider.service';
import { EntityFormColumnProvider } from 'src/app/core/services/entity/form/entity-form-column-provider';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.sass'],
  providers: [
    { provide: FORM_COLUMN_PROVIDER, useClass: EntityFormColumnProvider}
  ]
})
export class EntityFormComponent implements OnInit {
  @Input() entityTypeId: string;

  // new
  constructor(
    @Inject(FORM_COLUMN_PROVIDER) private columnProvider: EntityFormColumnProvider
  ) { }

  // init
  ngOnInit(): void {
    this.columnProvider.entityTypeId = this.entityTypeId;
  }
}
