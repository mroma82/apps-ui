import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../../../services/dialog.service';
import { BaseDialog } from '../../../abstractions/base-dialog';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent extends BaseDialog implements OnInit {

  modalDetails: any = {};

  // new
  constructor(
    modalService: NgbModal,
    private dialogService : DialogService    
  ) { 
    super(modalService);
    this.initOpenCloseSubscription(dialogService.yesNoDialogOpenClose$); 
    this.dialogService.yesNoDialog$.subscribe(x => this.modalDetails = x);
  }

  ngOnInit() {
   
  }

  // close
  close(result: DialogResultEnum) {
    this.modalDetails.result.next(result);
    this.modal.dismiss();
  }

  // yes
  yes() {
    this.close(DialogResultEnum.Yes);
  }
  
  // no button
  no() {
    this.close(DialogResultEnum.No);
  }

  // cancel button
  cancel() {
    this.close(DialogResultEnum.Cancel);
  }
}
