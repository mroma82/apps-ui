import { Component, Inject, OnInit } from '@angular/core';
import { EntitySingleRecordViewEditContextService } from 'src/app/core/services/entity/single-record/entity-single-record-view-edit-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../services/entity/entity-configuration.service';

@Component({
  selector: 'app-entity-single-record-page-generic',
  templateUrl: './entity-single-record-page-generic.component.html',
  styleUrls: ['./entity-single-record-page-generic.component.scss']
})
export class EntitySingleRecordPageGenericComponent implements OnInit {

  // entity type
  entityTypeId : string = this.entityConfig.entityTypeId;
  
  // new
  constructor(
    private context : EntitySingleRecordViewEditContextService,
    @Inject(ENTITY_CONFIG) private entityConfig : IEntityConfigurationService
  ) { }

  // init
  ngOnInit() {
  }

  // update
  update() {
    this.context.update().subscribe();
  }
}
