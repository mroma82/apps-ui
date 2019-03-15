import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecordContextService } from 'src/app/common/services/record-context.service';

@Component({
  selector: 'app-foundation-view-edit-button-bar',
  templateUrl: './foundation-view-edit-button-bar.component.html',
  styleUrls: ['./foundation-view-edit-button-bar.component.scss']
})
export class FoundationViewEditButtonBarComponent implements OnInit {
  @Input() contextId: string;
  @Input() contextType: number;
  
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private recordContext: RecordContextService
  ) { }

  ngOnInit() {
  }

  // open dialog
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${reason}`;
    });
  }

}
