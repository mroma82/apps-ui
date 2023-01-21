import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Optional } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDialog } from '../../../../../../common/abstractions/base-dialog';
import { DialogService } from '../../../../../../common/services/dialog.service';
import { ENTITY_CONFIG, IEntityConfigurationService } from '../../../../../../core/services/entity/entity-configuration.service';
import { EntityProviderService } from '../../../../../../core/services/entity/entity-provider.service';
import { EntitySubGridViewEditContextService } from '../../../../../../core/services/entity/sub-grid/entity-sub-grid-view-edit-context.service';
import { PmAgendaContextService } from '../../../../services/agenda/pm-agenda-context.service';
import { PmEventCompleteContextService } from '../../services/pm-event-complete-context.service';

@Component({
  selector: 'app-pm-event-complete-modal',
  templateUrl: './pm-event-complete-modal.component.html',
  styleUrls: ['./pm-event-complete-modal.component.scss']
})
export class PmEventCompleteModalComponent extends BaseDialog implements OnInit {
  @ViewChild('content', { static: true }) content: any;

  // model
  model$: Observable<any> = this.context.model$;

  // new
  constructor(
    modalService: NgbModal,
    private context: PmEventCompleteContextService,
    private dialogService: DialogService,
    @Optional() private agendaContext: PmAgendaContextService
  ) {
    super(modalService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }

  // init
  ngOnInit() {

  }

  // complete
  complete(model: any) {

    // complete
    this.context.complete(model).subscribe(res => {

      // check if ok
      if (res.success) {

        // refresh agenda if needed
        if (this.agendaContext)
          this.agendaContext.refreshItems();

        // close
        this.closeDialog();
      }
      else {
        this.dialogService.message("common.error", res.test);
      }
    });
  }

  // dismiss
  dismiss() {
    this.closeDialog();
  }
}