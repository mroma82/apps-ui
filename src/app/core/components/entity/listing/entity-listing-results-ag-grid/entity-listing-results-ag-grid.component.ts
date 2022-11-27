import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, DisplayedColumnsChangedEvent, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, SortChangedEvent } from 'ag-grid-community';
import { Observable, BehaviorSubject, Subject, forkJoin, of, zip } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';
import { GridCellLinkComponent } from '../../../../../common/components/ag-grid/grid-cell-link/grid-cell-link.component';
import { IEntityListingColumn } from '../../../../models/entity/entity-listing-column';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../services/entity/entity-configuration.service';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';
import { ENTITY_LISTING_CONFIG, IEntityListingConfigurationService } from '../../../../services/entity/listing/entity-listing-configuration.service';
import { EntityListingContextService } from '../../../../services/entity/listing/entity-listing-context.service';
import { EntityColumnType } from '../../../../types/entity-column-type.enum';

@Component({
  selector: 'app-entity-listing-results-ag-grid',
  templateUrl: './entity-listing-results-ag-grid.component.html',
  styleUrls: ['./entity-listing-results-ag-grid.component.scss']
})
export class EntityListingResultsAgGridComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // enums
  ColumnTypeEnum = EntityColumnType;

  // variables
  columnStateName: string;

  // observables
  ready$ = new BehaviorSubject<boolean>(false);
  listItems$: Observable<any[]> = this.context.listItems$;
  columnDefs$ = new BehaviorSubject<ColDef[]>([]);
  pageSize$: Observable<number> = this.context.pageSize$;

  // ag-grid
  gridColumnsApi: ColumnApi;
  gridApi: GridApi;

  // define grid options
  gridOptions: GridOptions = {

    // options
    rowHeight: 50,
    suppressCellSelection: true,
    enableRangeSelection: false,
    suppressAggFuncInHeader: true,
    cacheQuickFilter: true,
    animateRows: true,
    pagination: true,
    paginationPageSize: 25,

    // default column
    defaultColDef: {
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },

    // define columns type
    columnTypes: {},

    // grid ready
    onGridReady: (e: GridReadyEvent) => {
      this.gridColumnsApi = e.columnApi;
      this.gridApi = e.api;
    },

    // save status
    onDisplayedColumnsChanged: (e: DisplayedColumnsChangedEvent) => {
      localStorage.setItem(this.columnStateName, JSON.stringify(e.columnApi.getColumnState()))
    },

    // sort change  
    onSortChanged: (e: SortChangedEvent) => {
      //this.listingControlsContext.setSorting(grid.api.getSortModel())      
    },

    // first data rendered
    onFirstDataRendered: (e: FirstDataRenderedEvent) => {
      e.api.sizeColumnsToFit();
    },

    // set options
    context: {
      componentParent: this
    },

    // components
    frameworkComponents: {
      itemLinkRenderer: GridCellLinkComponent
    }
  };

  // new
  constructor(
    @Inject(ENTITY_LISTING_CONFIG) private config: IEntityListingConfigurationService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private context: EntityListingContextService,
    private entityProvider: EntityProviderService
  ) { }


  // init
  ngOnInit() {

    // setup observable for full column
    let fullColumns$ = this.config.getColumns().pipe(mergeMap(cols => {

      // go through each
      var titles$: Observable<string>[] = [];
      cols.forEach(col => {

        // get the title, put to rx array
        let title$ = this.getTitle(col);
        titles$.push(title$.pipe(tap(title => {
          col.title = title;
        })));

        // return the column
        return col;
      });

      // observable for all the titles to finish
      return forkJoin(titles$).pipe(map(() => cols));
    }));

    // wait for everything to finish
    zip(fullColumns$, this.context.canEdit$).subscribe(([cols, canEdit]) => {

      // set the column state
      this.columnStateName = `apps:listingState-${this.entityConfig.entityTypeId}`;

      // set column defs
      this.columnDefs$.next(this.getColumnDefs(cols, canEdit));

      // ready
      this.ready$.next(true);
    });

    // page size change
    this.pageSize$.subscribe(size => {
      if (this.gridApi)
        this.gridApi.paginationSetPageSize(size);
    });
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

  // function that generates the columns definitions
  getColumnDefs(cols: IEntityListingColumn[], canEdit: boolean): ColDef[] {

    // map the current list
    return cols.map(c => {
      const col = c;

      // init the ag-grid col def
      var colDef: ColDef = {
        field: col.model,
        headerName: col.title,
        filter: "agSetColumnFilter"
      };

      // get the type
      let colType = this.getColumnType(col);

      // html
      if (colType == EntityColumnType.Html) {
        colDef.cellRenderer = (params: any) => this.htmlRender(params, col);
      }

      // link
      else if (colType == EntityColumnType.Link) {

        // set the component and params
        colDef.cellRenderer = GridCellLinkComponent;
        colDef.cellRendererParams = {
          getModel: (params: { data: any, value: any }) => {
            return {
              text: params.value,
              viewUrl: this.getViewLink(params.data, col),
              editUrl: col.showEditLink ? this.getEditLink(params.data, col) : null,
              userHasEdit: col.showEditLink ? canEdit : false
            };
          }
        }
      }

      // check if a pipe
      else if (col.pipe) {
        colDef.cellRenderer = (params: { value: any }) => col.pipe.transform(params.value);
      }
      // check if a display function
      else if (col.displayFunc) {
        colDef.cellRenderer = (params: { data: any }) => col.displayFunc(params.data);
      }

      // return
      return colDef;
    });
  }

  // html render
  htmlRender(params: { data: any, value: any }, col: IEntityListingColumn) {

    // check if a display method
    if (col.displayFunc) {
      return col.displayFunc(params.data);
    }

    // fallback to value
    return params.value;
  }
}
