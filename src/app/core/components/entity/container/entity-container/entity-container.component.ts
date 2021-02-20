import { Component, Inject, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';

@Component({
  selector: 'app-entity-container',
  templateUrl: './entity-container.component.html',
  styleUrls: ['./entity-container.component.scss']
})
export class EntityContainerComponent implements OnInit {

  // new
  constructor(
    private appContext: AppContextService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private entityProvider: EntityProviderService
  ) { }

  ngOnInit() {

    // set the title
    this.entityProvider.getEntity(this.entityConfig.entityTypeId).subscribe(entity => {
      if(entity)
        this.appContext.Layout.setApp(entity.pluralName);
    });
  }

}
