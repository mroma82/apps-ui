import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../services/entity/entity-configuration.service';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';

@Component({
  selector: 'app-entity-create-modal',
  templateUrl: './entity-create-modal.component.html',
  styleUrls: ['./entity-create-modal.component.scss']
})
export class EntityCreateModalComponent extends BaseDialog {
  @ViewChild('content', { static: true }) content: any;

  // entity type id
  entityTypeId: string = this.entityConfig.entityTypeId;

  // setup
  modalConfig = {
    title: "Create"
  };

  // model
  model = {};

  // new
  constructor(
    modalService: NgbModal,
    private context: EntityCreateContextService,
    private entityProvider: EntityProviderService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService
  ) {
    super(modalService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }

  // init
  ngOnInit() {

  }

  // get modal title
  getModalTitle(): Observable<string> {

    // check if a custom title
    if (this.entityConfig.createName) {
      return of(this.entityConfig.createName);
    }

    // else, from the provider
    return this.entityProvider.getEntityName(this.entityConfig.entityTypeId);
  }

  // create
  create() {
    this.context.create().subscribe(x => {
      if (x) {
        this.context.dialogOpen$.next(false);
      }
    });
  }

  // dismiss
  dismiss() {
    this.context.dialogOpen$.next(false);
  }
}

