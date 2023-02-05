import { Component, Input, OnInit } from '@angular/core';
import { IEntityColumnDefinition } from '../../../../models/entity/entity-column-definition';
import { IEntitySubGridConfigurationService } from '../../../../services/entity/sub-grid/entity-sub-grid-configuration.service';

@Component({
  selector: 'app-entity-inner-list',
  templateUrl: './entity-inner-list.component.html',
  styleUrls: ['./entity-inner-list.component.scss']
})
export class EntityInnerListComponent implements OnInit {
  @Input() entityTypeId: string;
  @Input() filter: any;
  @Input() sort: any;
  @Input() cols: IEntityColumnDefinition[];
  @Input() viewLinkUrl: string;

  // sub grid config
  lineSubGridConfig: IEntitySubGridConfigurationService = {
    navigateToEditAfterCreate: false,
    navigateToViewOnLink: true
  };

  // init
  ngOnInit() {
    this.lineSubGridConfig.viewLinkUrl = this.viewLinkUrl;
  }

}
