import { Component, OnInit } from '@angular/core';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';

@Component({
  selector: 'app-entity-single-record-page-generic',
  templateUrl: './entity-single-record-page-generic.component.html',
  styleUrls: ['./entity-single-record-page-generic.component.scss']
})
export class EntitySingleRecordPageGenericComponent implements OnInit {

  // new
  constructor(
    private context : EntitySingleRecordViewEditContextService
  ) { }

  // init
  ngOnInit() {
  }

  // update
  update() {
    this.context.update().subscribe();
  }
}
