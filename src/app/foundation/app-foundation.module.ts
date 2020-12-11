import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationViewEditButtonBarComponent } from './components/foundation-view-edit-button-bar/foundation-view-edit-button-bar.component';
import { NoteListDialogComponent } from './dialogs/note-list-dialog/note-list-dialog.component';
import { NotesService } from './services/notes/notes-service';
import { FormsModule } from '@angular/forms';
import { AuditTrailService } from './services/audit-trail/audit-trail.service';
import { AuditTrailListDialogComponent } from './dialogs/audit-trail-list-dialog/audit-trail-list-dialog.component';
import { AttachmentListDialogComponent } from './dialogs/attachment-list-dialog/attachment-list-dialog.component';
import { AttachmentListComponent } from './components/attachment-list/attachment-list.component';
import { AttachmentAddComponent } from './components/attachment-add/attachment-add.component';
import { AttachmentEditComponent } from './components/attachment-edit/attachment-edit.component';
import { AttachmentService } from './services/attachment/attachment.service';
import { AppCommonModule } from '../common/app-common.module';
import { RecordLockService } from './services/record-lock/record-lock.service';
import { NotificationService } from './services/notification/notification.service';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { RouterModule } from '@angular/router';
import { NotificationListDialogComponent } from './dialogs/notification-list-dialog/notification-list-dialog.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { WorkflowBarComponent } from './components/workflow-bar/workflow-bar.component';
import { WorkflowService } from './services/workflow/workflow.service';
import { WorkflowAssignedListComponent } from './components/workflow-assigned-list/workflow-assigned-list.component';
import { WorkflowAssignedListDialogComponent } from './dialogs/workflow-assigned-list-dialog/workflow-assigned-list-dialog.component';
import { WorkflowRejectComponent } from './components/workflow-reject/workflow-reject.component';
import { WorkflowRejectDialogComponent } from './dialogs/workflow-reject-dialog/workflow-reject-dialog.component';
import { WorkflowHistoryListComponent } from './components/workflow-history-list/workflow-history-list.component';
import { WorkflowHistoryListDialogComponent } from './dialogs/workflow-history-list-dialog/workflow-history-list-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecordAuditInfoComponent } from './components/record-audit-info/record-audit-info.component';

@NgModule({
  declarations: [
    FoundationViewEditButtonBarComponent, 
    NoteListDialogComponent, 
    AuditTrailListDialogComponent, 
    AttachmentListDialogComponent, 
    AttachmentListComponent, 
    AttachmentAddComponent, 
    AttachmentEditComponent, 
    NotificationBarComponent, 
    NotificationListDialogComponent, 
    NotificationListComponent, 
    WorkflowBarComponent, 
    WorkflowAssignedListComponent, 
    WorkflowAssignedListDialogComponent, 
    WorkflowRejectComponent, 
    WorkflowRejectDialogComponent, 
    WorkflowHistoryListComponent, 
    WorkflowHistoryListDialogComponent, 
    RecordAuditInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    FoundationViewEditButtonBarComponent,
    NotificationBarComponent,
    WorkflowBarComponent,
    RecordAuditInfoComponent
  ],
  providers: [
    NotesService,
    AuditTrailService,
    AttachmentService,
    RecordLockService,
    NotificationService,
    WorkflowService
  ]
})
export class AppFoundationModule { }
