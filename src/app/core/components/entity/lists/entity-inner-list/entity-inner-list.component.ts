import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEntityColumnDefinition } from '../../../../models/entity/entity-column-definition';
import { IEntitySubGridColumn } from '../../../../models/entity/entity-subgrid-column';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';
import { EntityInnerListContextService } from '../../../../services/entity/inner-list/entity-inner-list-context.service';
import { EntityColumnType } from '../../../../types/entity-column-type.enum';

@Component({
  selector: 'app-entity-inner-list',
  templateUrl: './entity-inner-list.component.html',
  styleUrls: ['./entity-inner-list.component.scss'],
  providers: [
    EntityInnerListContextService
  ]
})
export class EntityInnerListComponent implements OnInit {
  @Input() entityTypeId: string;
  @Input() filter: any;
  @Input() maxItems: number = 10;
  @Input() sort: any;
  @Input() columns: IEntityColumnDefinition[];
  @Input() viewLinkUrl: string;
  @Input() viewAllUrl: string;
  @Input() viewAllUrlParams: any = {};
  @Input() viewAllUrlFilter: any = null;

  // state
  items$: Observable<any[]>;

  // enums
  ColumnTypeEnum = EntityColumnType;

  // new
  constructor(
    private context: EntityInnerListContextService,
    private entityProvider: EntityProviderService,
    private router: Router
  ) {
    this.items$ = context.items$;
  }

  // init
  ngOnInit() {

    // set
    this.context.entityTypeId$.next(this.entityTypeId);
    this.context.filter$.next(this.filter);
    this.context.maxItems$.next(this.maxItems);
    if (this.sort) this.context.sort$.next(this.sort);

    // check if we need to sset the url params
    if (this.viewAllUrlFilter !== null) {
      this.viewAllUrlParams = {
        filter: JSON.stringify(this.viewAllUrlFilter)
      }
    }
  }

  // view
  view(item: any, col: IEntitySubGridColumn) {

    // check if a view url    
    if (col.viewLinkFunc) {

      // navigate to it
      var viewLink = col.viewLinkFunc(item);
      this.router.navigateByUrl(viewLink);
    }

    // else, open the link
    else {
      this.router.navigateByUrl(`${this.viewLinkUrl}/${item.id}`);
    }
  }

  // get the column text
  getColumnText(item: any, col: IEntitySubGridColumn): Observable<any> {

    // check if any display functions
    if (col.displayFunc$)
      return col.displayFunc$(item);

    else if (col.displayFunc)
      return of(col.displayFunc(item));

    // else - the raw value
    var val = item[col.model];

    // check if expansion
    if (col.model.indexOf(".") >= 0) {
      val = item;
      var modelExpansion = col.model.split(".");
      for (var i = 0; i < modelExpansion.length; i++) {
        val = val[modelExpansion[i]];
      }
    }

    // cehck if any formatter
    if (col.formatter) {
      switch (col.formatter) {
        case 'd':
          val = new Date(val + 'Z').toLocaleDateString();
          break;
      }
    }

    // else just eh model
    return of(val);
  }

  // get title
  getTitle(col: IEntitySubGridColumn): Observable<string> {

    // check if a title
    if (col.title)
      return of(col.title);

    // parse out the name because we want to find from the entity provider
    const nameParts = col.model.split('.');
    const name = nameParts[nameParts.length - 1];

    // else, try to get form the entity column provider
    return this.entityProvider.getEntityColumn(this.entityTypeId, name).pipe(map(x => x?.label));
  }

  // get column type
  getColumnType(col: IEntitySubGridColumn): EntityColumnType {

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
