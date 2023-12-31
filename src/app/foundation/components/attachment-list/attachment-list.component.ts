import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';
import { environment } from 'src/environments/environment';
import { InstanceContextService } from 'src/app/common/services/instance-context.service';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit {

  // observables
  list$: Observable<any>;
  canEdit$ = this.context.canEdit$;

  // new
  constructor(
    private context: AttachmentDialogContextService,
    private instanceContext: InstanceContextService
  ) {
    this.list$ = context.list$;
  }

  // add
  add() {
    this.context.setDialogMode('add');
  }

  // view url
  getViewUrl(attachment: any) {
    return `${environment.apiUrl}/foundation/attachment/view/${attachment.id}?i=${this.instanceContext.instanceId}`;
  }

  // download url
  getDownloadUrl(attachment: any) {
    return `${environment.apiUrl}/foundation/attachment/download/${attachment.id}?i=${this.instanceContext.instanceId}`;
  }

  // checks if the attachment is an image
  isImage(attachment: any) {
    return ["png", "jpg", "jpeg", "gif"].indexOf(attachment.fileType.toLowerCase()) >= 0;
  }

  // edit
  edit(attachment: any) {
    attachment.editPending = true;
    attachment.descriptionEdit = attachment.description;
  }
  editCommit(attachment: any) {

    // save
    this.context.update({
      id: attachment.id,
      description: attachment.descriptionEdit,
      recordVersion: attachment.recordVersion
    }).subscribe(x => {

      // check if ok
      if (x.success) {
        attachment.editPending = false;
        this.context.refreshList();
      }
    });
  }
  editCancel(attachment: any) {
    attachment.editPending = false;
  }


  // delete
  delete(attachment: any) {
    attachment.deletePending = true;
  }
  deleteCommit(attachment: any) {

    // save
    this.context.delete(attachment.id).subscribe(x => {

      // check if ok
      if (x.success) {
        attachment.deletePending = false;
        this.context.refreshList();
      }
    });
  }
  deleteCancel(attachment: any) {
    attachment.deletePending = false;
  }


  // init
  ngOnInit() {
  }

}
