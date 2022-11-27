import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
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
  ColumnTypeEnum = EntityColumnType;

  // observables
  listItems$: Observable<any[]> = this.context.listItems$;
  columns$ = new BehaviorSubject<IEntityListingColumn[]>([]);
  columnDefs$ = new BehaviorSubject<ColDef[]>([]);
  pageSize$: Observable<number> = this.context.pageSize$;
  ready$ = new BehaviorSubject<boolean>(false);
  columnStateName: "grid-Test";

  gridColumnsApi: ColumnApi;
  gridApi: GridApi;


  gridOptions = {
    rowHeight: 50,
    suppressCellSelection: true,
    enableRangeSelection: false,
    suppressAggFuncInHeader: true,
    defaultColDef: {
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
    },
    // define columns type
    columnTypes: {
      dateColumn: {
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: this.dateComparator,
          clearButton: true
        },
        valueFormatter: params => this.dateFormatter(params.value, 'mediumDate')
      }
    },
    // Turn on cache will improve
    // the search with more than 10,000 rows.
    cacheQuickFilter: true,
    // have some fun with the animation.
    animateRows: true,
    // show 50 rec per page
    pagination: true,
    paginationPageSize: 25,
    // grid ready
    onGridReady: (params) => {
      this.gridColumnsApi = params.columnApi;
      this.gridApi = params.api;

      // get columns
      /*this.getColumnDefs().pipe(take(1)).subscribe(colDefs => {

        // setup columns
        this.updateColumns(colDefs);

        // subscribe to items
        this.items$.subscribe(rowData => {
          if (this.gridOptions.api) {

            this.gridOptions.api.setRowData(rowData);
            // restore previous filters text
            this.loadFilters();
            this.loadSorting();
            // check if a filter
            if (this.listingControlsContext.searchText$.value) {
              this.gridOptions.api.setQuickFilter(this.listingControlsContext.searchText$.value);
            }
          }
        });
      });*/
    },
    onDisplayedColumnsChanged: (event) => {
      localStorage.setItem(this.columnStateName, JSON.stringify(event.columnApi.getColumnState()))
    },

    onFilterChanged: (filters) => {
      //this.listingControlsContext.setFilters(filters.api.getFilterModel());
    },
    onSortChanged: (grid) => {
      //this.listingControlsContext.setSorting(grid.api.getSortModel())
    },
    // first data rendered
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },

    // set options
    gridContext: { componentParent: this },
    gridFrameworkComponents: {
      itemLinkRenderer: GridCellLinkComponent
    }
  };

  headers: string[] = [];

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

    // get the 
    let cols$ = this.config.getColumns().pipe(mergeMap(cols => {
      var x: Observable<string>[] = [];

      cols.forEach(c => {
        let title$ = this.getTitle(c);

        x.push(title$.pipe(tap(title => {
          c.title = title;
        })));

        return c;
      });

      return forkJoin(x).pipe(map(() => cols));
    }));

    zip(cols$, this.canEdit$).subscribe(([cols, canEdit]) => {
      this.columns$.next(cols);
      this.columnDefs$.next(this.getColumnDefs(cols, canEdit));
      this.ready$.next(true);
    })

    // page size change
    this.pageSize$.subscribe(size => {
      if (this.gridApi)
        this.gridApi.paginationSetPageSize(size);
    });

    /*this.columns$.pipe(flatMap(x => {
      x
    })).subscribe(c => {
      this.headers = [];
      c.forEach((x, i) => {
        x.
      })
    })*/

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

  // Data that gets displayed in the grid
  public rowData$: Observable<any[]> = this.context.listItems$;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from sever
  onGridReady(params: GridReadyEvent, items: any[]) {
    console.log('here');
    //this.rowData$ = items;
  }

  // function that generates the columns definitions
  getColumnDefs(cols: IEntityListingColumn[], canEdit: boolean): ColDef[] {

    // map the current list
    return cols.map(c => {
      const col = c;

      // init the ag-grid col def
      var x: ColDef = {
        field: c.model,
        headerName: c.title,
        filter: "agSetColumnFilter"
      };

      // get the type
      let colType = this.getColumnType(c);

      // html
      if (colType == EntityColumnType.Html) {
        x.cellRenderer = (params: any) => this.htmlRender(params, c);
      }

      // link
      else if (colType == EntityColumnType.Link) {

        // set the component and params
        x.cellRenderer = GridCellLinkComponent;
        x.cellRendererParams = {
          getModel: (params) => {
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
      else if (c.pipe) {
        x.cellRenderer = (params: any) => c.pipe.transform(params.value);
      }
      // check if a display function
      else if (c.displayFunc) {
        x.cellRenderer = (params: any) => c.displayFunc(params.data);
      }

      // return
      return x;
    });
  }

  // html render
  htmlRender(params: any, col: IEntityListingColumn) {

    // check if a display method
    if (col.displayFunc) {
      return col.displayFunc(params.data);
    }

    // fallback to value
    return params.value;
  }

  ///

  // use for date filter.
  dateComparator(filterValue, cellValue) {
    var cellDate = new Date(cellValue);
    // reset the cell time to midnight.
    cellDate.setHours(0, 0, 0, 0);
    if (filterValue.getTime() === cellDate.getTime()) {
      return 0
    }

    if (cellDate < filterValue) {
      return -1;
    }

    if (cellDate > filterValue) {
      return 1;
    }
  }

  // format date
  dateFormatter(value: string, format: string) {
    var date = new Date(value);
    // check if the date is 01/01/1900 0:00:00
    if (date.getTime() < 0) {
      return ''
    } else {
      return new DatePipe('en-US').transform(value, format);
    }
  }
}
