import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NotesListDialogContextService } from '../../services/notes/notes-list-dialog-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-list-dialog',
  templateUrl: './note-list-dialog.component.html',
  styleUrls: ['./note-list-dialog.component.scss']  
})
export class NoteListDialogComponent extends BaseDialog implements OnInit  {

  // new
  constructor(
    modalService: NgbModal,        
    private context : NotesListDialogContextService

  ) {
    super(modalService);

    // setup open/close subscription
    this.initOpenCloseSubscription(context.dialogOpenClose$);
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
    this.list$ = this.context.list$;
  }

  // refresh the list
  refresh() {
    this.context.refreshList();
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

    this.context.update({
      id: item.id,
      contentText: item.contentTextEdit
    }).subscribe();
  }

  // delete
  delete(item) {
    item.deletePending = true;
  }
  deleteCancel(item) {
    item.deletePending = false;
  }
  deleteConfirm(item) {
    this.context.delete(item.id).subscribe();    
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
    this.context.add({
      contentText: this.model.addModel.contentText
    }).subscribe(x => {
      this.refresh();
      this.model.addPending = false;
    });  
  }
}
