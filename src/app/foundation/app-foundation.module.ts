import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationViewEditButtonBarComponent } from './components/foundation-view-edit-button-bar/foundation-view-edit-button-bar.component';
import { NoteListDialogComponent } from './dialogs/note-list-dialog/note-list-dialog.component';
import { NotesService } from './services/notes-service';
import { FormsModule } from '@angular/forms';
import { AuditTrailService } from './services/audit-trail/audit-trail.service';
import { AuditTrailListDialogComponent } from './dialogs/audit-trail-list-dialog/audit-trail-list-dialog.component';

@NgModule({
  declarations: [FoundationViewEditButtonBarComponent, NoteListDialogComponent, AuditTrailListDialogComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FoundationViewEditButtonBarComponent
  ],
  providers: [
    NotesService,
    AuditTrailService
  ]
})
export class AppFoundationModule { }
