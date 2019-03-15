import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationViewEditButtonBarComponent } from './components/foundation-view-edit-button-bar/foundation-view-edit-button-bar.component';
import { NoteListDialogComponent } from './dialogs/note-list-dialog/note-list-dialog.component';
import { NotesService } from './services/notes-service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FoundationViewEditButtonBarComponent, NoteListDialogComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FoundationViewEditButtonBarComponent
  ],
  providers: [
    NotesService
  ]
})
export class AppFoundationModule { }
