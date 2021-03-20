import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';

@Component({
  selector: 'app-entity-sub-grid-view-edit-modal',
  templateUrl: './entity-sub-grid-view-edit-modal.component.html',
  styleUrls: ['./entity-sub-grid-view-edit-modal.component.scss']
})
export class EntitySubGridViewEditModalComponent extends BaseDialog {  
  @ViewChild('content', { static: true }) content : any;  

  // entity type id
  entityTypeId : string = this.context.entityTypeId;

  // observables
  mode$ : Observable<'view' | 'edit'> = this.context.mode$;
  
  // setup
  modalConfig = {};

  // model
  model = {};

  // new
  constructor(
    modalService: NgbModal,
    private context: EntitySubGridViewEditContextService
  ) { 
    super(modalService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }
  
  // init
  ngOnInit() {
    
  }

  // update
  update() {
    this.context.update().subscribe(success => {
      if(success) {
        this.closeDialog();
      }
    });
  }

  // dismiss
  dismiss() {
    this.context.dialogOpen$.next(false);
  }
}
