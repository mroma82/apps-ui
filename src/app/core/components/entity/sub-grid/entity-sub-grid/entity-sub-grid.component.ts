import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { IEntityValidationService } from 'src/app/core/services/entity/entity-validation.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-entity-sub-grid',
  templateUrl: './entity-sub-grid.component.html',
  styleUrls: ['./entity-sub-grid.component.scss'],
  providers: [
    EntitySubGridContextService,
    EntityConfigurationService,
    EntityCreateContextService,    
    EntitySubGridViewEditContextService,
  ]
})
export class EntitySubGridComponent implements OnInit {
  @Input() entityTypeId : string;
  @Input() mode : 'view' | 'edit';
  @Input() filter : any;
  @Input() sort: any;
  @Input() columns: any[];
  @Input() config: IEntitySubGridConfigurationService;  
  @Input() modelDefault : any;
  @Input() validationService: IEntityValidationService;


  // state
  items$ : Observable<any[]>;

  // new
  constructor(
    private context : EntitySubGridContextService,
    private entityConfig : EntityConfigurationService,
    private dialogService : DialogService,
    private createContext: EntityCreateContextService,
    private viewEditContext: EntitySubGridViewEditContextService,
  ) { 
    this.items$ = context.items$;    
    
  }

  ngOnInit() {
        
    // hack
    this.context.entityTypeId$.next(this.entityTypeId);
    this.context.filter$.next(this.filter);        
    this.context.modelDefault$.next(this.modelDefault);
    if(this.sort) this.context.sort$.next(this.sort);

    // setup config
    if(this.config !== null) {
      this.entityConfig.entityTypeId = this.entityTypeId;
      this.entityConfig.createFormComponent = this.config.createFormComponent;
      this.entityConfig.viewEditFormComponent = this.config.editFormComponent;
    }
  }

  // open the create dialog
  create() {
    this.createContext.openDialog();
  }

  // view
  view(id: string) {

    // edit
    this.viewEditContext.openDialog("view", id);
  }

  // edit
  edit(id: string) {

    // edit
    this.viewEditContext.openDialog("edit", id);
  }

  // delete
  delete(id: string) {

    // ask
    this.dialogService.yesNo("Delete", "Are you sure you want to delete this item?").subscribe(dialogResult => {
      if(dialogResult == DialogResultEnum.Yes) {

        // delete
        this.context.delete(id).subscribe();          
      }
    });    
  }

  // get the column text
  getColumnText(item: any, col: any) : Observable<any> {

    // check if any display functions
    if(col.displayFunc$)
      return col.displayFunc$(item);

    else if(col.displayFunc) 
      return of(col.displayFunc(item));

    // else just eh model
    return of(item[col.model]);
  }
}
