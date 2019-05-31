import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent extends BaseDialog implements OnInit {

  modalDetails: any = {};

  // new
  constructor(
    modalService: NgbModal,
    private dialogService : DialogService    
  ) { 
    super(modalService);
    this.initOpenCloseSubscription(dialogService.messageDialogOpenClose$); 
    this.dialogService.messageDialog$.subscribe(x => this.modalDetails = x);
  }

  ngOnInit() {
   
  }

  // close
  close() {
    this.modalDetails.result.next(true);
    this.modal.dismiss();
  }  
}
