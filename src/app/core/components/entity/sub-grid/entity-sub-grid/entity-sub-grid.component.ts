import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntitySubGridContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-context.service';

@Component({
  selector: 'app-entity-sub-grid',
  templateUrl: './entity-sub-grid.component.html',
  styleUrls: ['./entity-sub-grid.component.scss'],
  providers: [
    EntitySubGridContextService,
    EntityConfigurationService,
    { provide: 'IEntityCreateContextService', useClass: EntityCreateContextService }
  ]
})
export class EntitySubGridComponent implements OnInit {
  @Input() entityTypeId : string;
  @Input() filter : any;
  @Input() columns: any[];
  @Input() config: IEntitySubGridConfigurationService;  
  @Input() modelDefault : any;

  // state
  items$ : Observable<any[]>;

  // new
  constructor(
    private context : EntitySubGridContextService,
    private entityConfig : EntityConfigurationService,
    private dialogService : DialogService,
    @Inject("IEntityCreateContextService") private createContext: EntityCreateContextService    
  ) { 
    this.items$ = context.items$;
    
  }

  ngOnInit() {
    
    // hack
    this.context.entityTypeId$.next(this.entityTypeId);
    this.context.filter$.next(this.filter);    
    this.context.modelDefault$.next(this.modelDefault);


    // setup config
    if(this.config !== null) {
      this.entityConfig.entityTypeId = this.entityTypeId;
      this.entityConfig.createFormComponent = this.config.createFormComponent;
    }
  }

  // open the create dialog
  openCreateDialog() {
    this.createContext.openDialog();
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
}
