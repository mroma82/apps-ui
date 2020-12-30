import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuditTrailDialogContextService } from '../../services/audit-trail/audit-trail-dialog-context.service';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { NotesListDialogContextService } from '../../services/notes/notes-list-dialog-context.service';
import { Observable, of } from 'rxjs';
import { EntityProviderService } from 'src/app/core/services/entity/entity-provider.service';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { SecurityPermissionMask } from 'src/app/common/enums/security-permission-mask';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-foundation-view-edit-button-bar',
  templateUrl: './foundation-view-edit-button-bar.component.html',
  styleUrls: ['./foundation-view-edit-button-bar.component.scss'],
  providers: [
    AuditTrailDialogContextService,
    AttachmentDialogContextService,
    NotesListDialogContextService
  ]
})
export class FoundationViewEditButtonBarComponent implements OnInit {
  @Input() entityId: string;
  @Input() entityTypeId: string;
  @Input() viewMode: boolean;
  @Input() listPageUrl: string;

  // events
  @Output() onEdit = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onSaveClose = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  // options
  hasAuditTrail$ : Observable<boolean> = of(false);

  // counts
  noteCount$ = this.notesDialogContext.count$;
  attachmentCount$ = this.attachmentsDialogContext.count$;

  // permissions
  canEdit$ : Observable<boolean> = of(false);
  canDelete$ : Observable<boolean> = of(false);

  // new
  constructor(
    private notesDialogContext: NotesListDialogContextService,
    private auditTrailContext: AuditTrailDialogContextService,
    private attachmentsDialogContext : AttachmentDialogContextService,    
    private dialogService : DialogService,
    private entityProvider: EntityProviderService,
    private entityApi: EntityApiService
  )
  {    
    console.log(this.entityTypeId);
  }
  
  // init
  ngOnInit() {

    // has audit trail
    this.hasAuditTrail$ = this.entityProvider.hasAuditTrail(this.entityTypeId);

    // permissions
    this.canEdit$ = this.entityApi.hasAccess(this.entityTypeId, SecurityPermissionMask.Edit).pipe(tap(x => console.log(["A", x])), shareReplay(1));
    this.canDelete$ = this.entityApi.hasAccess(this.entityTypeId, SecurityPermissionMask.Delete).pipe(tap(x => console.log(["A", x])), shareReplay(1));

    // refresh lists
    this.notesDialogContext.refreshList();
    this.attachmentsDialogContext.refreshList();
  }

  // edit
  edit() {
    this.onEdit.emit();
  }

  // save
  save() {
    this.onSave.emit();
  }

  // save and close
  saveClose() {
    this.onSaveClose.emit();
  }

  // delete
  delete() {

    // ask
    this.dialogService.yesNo("Delete", "Are you sure you want to delete?").subscribe(x => {
      if(x == DialogResultEnum.Yes) {
        this.onDelete.emit();
      }
    });          
  }

  // print
  print() {
    window.print();
  }

  // open audit trail
  openAuditTrail() {
    this.auditTrailContext.openDialog();
  }

  // open attachment dialog
  openAttachmentsDialog() {
    this.attachmentsDialogContext.openDialog();
  }

  // open notes dialog
  openNotesDialog() {
    this.notesDialogContext.openDialog();
  }
}
