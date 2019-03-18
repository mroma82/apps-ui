import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { AuditTrailDialogContextService } from '../../services/audit-trail/audit-trail-dialog-context.service';

@Component({
  selector: 'app-foundation-view-edit-button-bar',
  templateUrl: './foundation-view-edit-button-bar.component.html',
  styleUrls: ['./foundation-view-edit-button-bar.component.scss'],
  providers: [
    AuditTrailDialogContextService
  ]
})
export class FoundationViewEditButtonBarComponent implements OnInit {
  @Input() contextId: string;
  @Input() contextType: number;

  // new
  constructor(
    private auditTrailContext: AuditTrailDialogContextService
  )
  {}
  
  ngOnInit() {
  }

  // open audit trail
  openAuditTrail() {
    this.auditTrailContext.openDialog();
  }
}
