import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEntityListingColumn } from 'src/app/core/models/entity/entity-listing-column';
import { ENTITY_LISTING_CONFIG, IEntityListingConfigurationService } from 'src/app/core/services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from 'src/app/core/services/entity/listing/entity-listing-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../services/entity/entity-configuration.service';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';
import { EntityColumnType } from '../../../../types/entity-column-type.enum';

@Component({
  selector: 'app-entity-listing-results-data-table',
  templateUrl: './entity-listing-results-data-table.component.html',
  styleUrls: ['./entity-listing-results-data-table.component.scss']
})
export class EntityListingResultsDataTableComponent implements OnInit {
  ColumnTypeEnum = EntityColumnType;

  // observables
  listItems$: Observable<any[]> = this.context.listItems$;
  columns$: Observable<IEntityListingColumn[]> = this.config.getColumns();
  pageSize$: Observable<number> = this.context.pageSize$;

  // permissions
  canEdit$ = this.context.canEdit$;

  // new
  constructor(
    private context: EntityListingContextService,
    @Inject(ENTITY_LISTING_CONFIG) private config: IEntityListingConfigurationService,
    private entityProvider: EntityProviderService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService
  ) { }

  ngOnInit() {
  }

  // on page
  onPage(e) {
    this.context.setPage(e.offset + 1);
  }

  onSort(e) {
    if (e.sorts.length) {
      this.context.setSort({
        field: e.sorts[0].prop,
        isDescending: e.sorts[0].dir === "desc"
      })
    }
  }

  // title
  getTitle(col: IEntityListingColumn): Observable<string> {

    // check if a title
    if (col.title)
      return of(col.title);

    // parse out the name because we want to find from the entity provider
    const nameParts = col.model.split('.');
    const name = nameParts[nameParts.length - 1];

    // else, try to get form the entity column provider
    return this.entityProvider.getEntityColumn(this.entityConfig.entityTypeId, name).pipe(map(x => x?.label));
  }

  // view link
  getViewLink(item: any, col: IEntityListingColumn) {

    // check if no func
    if (col.viewLinkFunc) {
      return col.viewLinkFunc(item);
    }

    // else, the normal url
    return `../view/${item.id}`;
  }

  // edit link
  getEditLink(item: any, col: IEntityListingColumn) {

    // check if no func
    if (col.editLinkFunc) {
      return col.editLinkFunc(item);
    }

    // else, the normal url
    return `../edit/${item.id}`;
  }

  // get column type
  getColumnType(col: IEntityListingColumn): EntityColumnType {

    // check if a link
    if (col.isLink)
      return EntityColumnType.Link;

    // check if html
    if (col.isHtml)
      return EntityColumnType.Html;

    // default
    return EntityColumnType.Regular;
  }
}
