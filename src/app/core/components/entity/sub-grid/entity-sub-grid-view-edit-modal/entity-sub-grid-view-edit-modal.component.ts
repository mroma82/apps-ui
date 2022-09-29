import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';
import { EntitySubGridViewEditContextService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../services/entity/entity-configuration.service';
import { EntityProviderService } from '../../../../services/entity/entity-provider.service';

@Component({
  selector: 'app-entity-sub-grid-view-edit-modal',
  templateUrl: './entity-sub-grid-view-edit-modal.component.html',
  styleUrls: ['./entity-sub-grid-view-edit-modal.component.scss']
})
export class EntitySubGridViewEditModalComponent extends BaseDialog {
  @ViewChild('content', { static: true }) content: any;

  // entity type id
  entityTypeId: string = this.context.entityTypeId;

  // observables
  mode$: Observable<'view' | 'edit'> = this.context.mode$;
  modeTitle$ = this.mode$.pipe(map(x =>
    x === 'view' ? "View" :
      x === 'edit' ? "Edit" :
        ""));

  // setup
  modalConfig = {};

  // model
  model = {};

  // new
  constructor(
    modalService: NgbModal,
    private context: EntitySubGridViewEditContextService,
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
    if (this.entityConfig.viewEditName) {
      return of(this.entityConfig.viewEditName);
    }

    // else, from the provider
    return this.entityProvider.getEntityName(this.entityConfig.entityTypeId);
  }

  // update
  update() {
    this.context.update().subscribe(success => {
      if (success) {
        this.closeDialog();
      }
    });
  }

  // dismiss
  dismiss() {
    this.context.dialogOpen$.next(false);
  }
}
