import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AttachmentDialogContextService } from '../../services/attachment/attachment-dialog-context.service';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit {

  // observables
  list$: Observable<any>;

  // new
  constructor(
    private context: AttachmentDialogContextService
  ) { 
    this.list$ = context.list$;    
  }

  // add
  add() {
    this.context.setDialogMode('add');
  }

  ngOnInit() {
  }

}
