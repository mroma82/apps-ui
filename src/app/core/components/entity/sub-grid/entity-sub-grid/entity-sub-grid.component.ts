import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { IEntitySubGridColumn } from 'src/app/core/models/entity/entity-subgrid-column';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';
import { IEntityColumnDefinition } from '../../../../models/entity/entity-column-definition';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';
import { EntityColumnType } from '../../../../types/entity-column-type.enum';

@Component({
  selector: 'app-entity-sub-grid',
  templateUrl: './entity-sub-grid.component.html',
  styleUrls: ['./entity-sub-grid.component.scss'],
  providers: [
    EntitySubGridContextService,
    EntityCreateContextService,
    EntitySubGridViewEditContextService,
  ]
})
export class EntitySubGridComponent implements OnInit {
  @Input() entityTypeId: string;
  @Input() mode: 'view' | 'edit';
  @Input() filter: any;
  @Input() sort: any;
  @Input() columns: IEntitySubGridColumn[];
  @Input() config: IEntitySubGridConfigurationService;
  @Input() modelDefault: any;
  @Input() validationService: IEntityValidationService;

  // enums
  ColumnTypeEnum = EntityColumnType;

  // state
  items$: Observable<any[]>;

  // new
  constructor(
    private context: EntitySubGridContextService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private entityProvider: EntityProviderService,
    private dialogService: DialogService,
    private createContext: EntityCreateContextService,
    private viewEditContext: EntitySubGridViewEditContextService,
    private router: Router
  ) {
    this.items$ = context.items$;

  }

  ngOnInit() {

    // hack
    this.context.entityTypeId$.next(this.entityTypeId);
    this.context.filter$.next(this.filter);
    this.context.modelDefault$.next(this.modelDefault);
    if (this.sort) this.context.sort$.next(this.sort);

    // setup config
    if (this.config !== null) {
      this.entityConfig.entityTypeId = this.entityTypeId;
      this.entityConfig.createFormComponent = this.config.createFormComponent;
      this.entityConfig.viewEditFormComponent = this.config.editFormComponent;
      this.entityConfig.navigateToEditAfterCreate = this.config.navigateToEditAfterCreate;
    }
  }

  // open the create dialog
  create() {
    this.createContext.openDialog();
  }

  // view
  view(item: any, col: IEntitySubGridColumn) {

    // check if a view url    
    if (col.viewLinkFunc) {

      // navigate to it
      var viewLink = col.viewLinkFunc(item);
      this.router.navigateByUrl(viewLink);
    }

    // else, open the view dialog
    else {
      this.viewEditContext.openDialog("view", item.id);
    }
  }

  // edit
  edit(item: any) {
    this.viewEditContext.openDialog("edit", item.id);
  }

  // delete
  delete(id: string) {

    // delete name
    const deleteName$ = (this.entityConfig.deleteName)
      ? of(this.entityConfig.deleteName)
      : this.entityProvider.getEntityName(this.entityConfig.entityTypeId);

    // ask
    deleteName$.pipe(flatMap(name => this.dialogService.yesNo(`Delete ${name}`, "Are you sure you want to delete this record?"))).subscribe(dialogResult => {
      if (dialogResult == DialogResultEnum.Yes) {

        // delete
        this.context.delete(id).subscribe();
      }
    });
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
    return this.entityProvider.getEntityColumn(this.entityConfig.entityTypeId, name).pipe(map(x => x?.label));
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

