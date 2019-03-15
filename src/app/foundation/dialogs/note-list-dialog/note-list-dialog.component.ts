import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { NotesService } from '../../services/notes-service';
import { NotesListDialogContextService } from '../../services/notes-list-dialog-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-list-dialog',
  templateUrl: './note-list-dialog.component.html',
  styleUrls: ['./note-list-dialog.component.scss'],
  providers: [NotesListDialogContextService]
})
export class NoteListDialogComponent extends BaseDialog implements OnInit  {
  version = 4;

  // new
  constructor(
    modalService: NgbModal,    
    private notesService : NotesService,
    private notesListDialogContext : NotesListDialogContextService

  ) {
    super(modalService);
  } 

  // list
  list$ : Observable<any[]>

  // model
  model = {
    addPending: false,
    addModel: {
      contentText: ""
    }
  };

  // init
  ngOnInit(): void {

    // setup obserables
    this.list$ = this.notesListDialogContext.list$;
  }

  // refresh the list
  refresh() {
    this.notesListDialogContext.refreshList();
  }
  

  // edit
  edit(item) {
    item.contentTextEdit = item.contentText;
    item.editPending = true;
  }
  editCancel(item) {
    item.editPending = false;
  }
  editConfirm(item) {

    this.notesService.addUpdate({
      id: item.id,
      contentText: item.contentTextEdit
    }).subscribe(x => {
      this.refresh();
    });    
  }

  // delete
  delete(item) {
    item.deletePending = true;
  }
  deleteCancel(item) {
    item.deletePending = false;
  }
  deleteConfirm(item) {
    
    // delete
    this.notesService.delete(item.id).subscribe(x => {
      this.refresh();
    })
  }

  
  // save
  add() {
    this.model.addPending = true;
    this.model.addModel = {
      contentText: ""
    };
  }
  addCancel() {
    this.model.addPending = false;
  }
  addCommit() {
    this.notesListDialogContext.add({
      contentText: this.model.addModel.contentText
    }).subscribe(x => {
      this.refresh();
      this.model.addPending = false;
    });  
  }
}
