import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationViewEditButtonBarComponent } from './components/foundation-view-edit-button-bar/foundation-view-edit-button-bar.component';
import { NoteListDialogComponent } from './dialogs/note-list-dialog/note-list-dialog.component';
import { NotesService } from './services/notes-service';
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
import { NotificationContextService } from './services/notification/notification-context.service';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { RouterModule } from '@angular/router';
import { NotificationListDialogComponent } from './dialogs/notification-list-dialog/notification-list-dialog.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [FoundationViewEditButtonBarComponent, NoteListDialogComponent, AuditTrailListDialogComponent, AttachmentListDialogComponent, AttachmentListComponent, AttachmentAddComponent, AttachmentEditComponent, NotificationBarComponent, NotificationListDialogComponent, NotificationListComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppCommonModule,
    RouterModule
  ],
  exports: [
    FoundationViewEditButtonBarComponent,
    NotificationBarComponent   
  ],
  providers: [
    NotesService,
    AuditTrailService,
    AttachmentService,
    RecordLockService,
    NotificationService,
    NotificationContextService
  ]
})
export class AppFoundationModule { }
