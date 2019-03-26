import { Component, OnInit } from '@angular/core';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attachment-add',
  templateUrl: './attachment-add.component.html',
  styleUrls: ['./attachment-add.component.scss']
})
export class AttachmentAddComponent implements OnInit {

  // observables
  tempFile$ : Observable<any>;

  // model
  model = {
    description: ""
  };

  // new
  constructor(
    private context : AttachmentDialogContextService
  ) { }

  // cancel
  cancel() {
    this.context.setDialogMode("list");
  }

  // init
  ngOnInit() {
    this.tempFile$ = this.context.tempFile$;
  }

  // on upload files
  onUpload(files) {

    // check if none
    if (files.length === 0)
      return;

    // upload the file
    this.context.uploadFile(files[0]);    
  }

  // save
  save() {
    this.context.add({
      description: this.model.description      
    }).subscribe(x => {
      this.context.refreshList();
      this.context.closeDialog();
    });
  }
}
