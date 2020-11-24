import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';

@Component({
  selector: 'app-entity-create-modal',
  templateUrl: './entity-create-modal.component.html',
  styleUrls: ['./entity-create-modal.component.scss']
})
export class EntityCreateModalComponent extends BaseDialog {  
  @ViewChild('content', ) content : any;  

  // setup
  modalConfig = {
    title: "Create"
  };

  model = {};

  // new
  constructor(
    modalService: NgbModal,
    private context: EntityCreateContextService        
  ) { 
    super(modalService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }
  
  // init
  ngOnInit() {
    
  }

  // create
  create() {
    this.context.create().subscribe(x => {
      if(x) {
        this.closeDialog();
      }
    });
  }
}

