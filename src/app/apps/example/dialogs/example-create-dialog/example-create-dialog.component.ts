import { Component, OnInit } from '@angular/core';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExampleCreateContextService } from '../../services/example-create-context.service';

@Component({
  selector: 'app-example-create-dialog',
  templateUrl: './example-create-dialog.component.html',
  styleUrls: ['./example-create-dialog.component.scss']
})
export class ExampleCreateDialogComponent extends BaseDialog {

  constructor(
    modelService: NgbModal,
    context: ExampleCreateContextService
  ) { 
    super(modelService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }

  ngOnInit() {
  }

}
