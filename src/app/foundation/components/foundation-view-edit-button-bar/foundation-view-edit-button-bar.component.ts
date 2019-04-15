import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuditTrailDialogContextService } from '../../services/audit-trail/audit-trail-dialog-context.service';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';

@Component({
  selector: 'app-foundation-view-edit-button-bar',
  templateUrl: './foundation-view-edit-button-bar.component.html',
  styleUrls: ['./foundation-view-edit-button-bar.component.scss'],
  providers: [
    AuditTrailDialogContextService,
    AttachmentDialogContextService
  ]
})
export class FoundationViewEditButtonBarComponent implements OnInit {
  @Input() contextId: string;
  @Input() contextType: number;
  @Input() viewMode: boolean;

  // events
  @Output() onEdit = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onSaveClose = new EventEmitter<void>();

  // new
  constructor(
    private auditTrailContext: AuditTrailDialogContextService,
    private attachmentsDialogContext : AttachmentDialogContextService
  )
  {}
  
  // init
  ngOnInit() {
  }

  // edit
  edit() {
    this.onEdit.emit();
  }

  // edit
  save() {
    this.onSave.emit();
  }

  // edit
  saveClose() {
    this.onSaveClose.emit();
  }

  // open audit trail
  openAuditTrail() {
    this.auditTrailContext.openDialog();
  }

  // open attachment dialog
  openAttachmentsDialog() {
    this.attachmentsDialogContext.openDialog();
  }
}
