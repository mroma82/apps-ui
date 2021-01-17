import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { LookupDialogContainerComponent } from '../containers/lookup-dialog-container/lookup-dialog-container.component';
import { BaseDialog } from '../../abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntegrationService } from '../../services/integration.service';

@Component({
  selector: 'app-customer-lookup-dialog',
  templateUrl: './customer-lookup-dialog.component.html',
  styleUrls: ['./customer-lookup-dialog.component.scss']
})
export class CustomerLookupDialogComponent extends BaseDialog {
  @Output() onSelect = new EventEmitter<any>();

  items$ = new BehaviorSubject<any>([]);

  // new
  constructor(
    modalService : NgbModal,
    private integrationService: IntegrationService
  ) {
    super(modalService);
  }

  ngOnInit() {
    
    // search
    this.onSearch("");
  }
  
  // on search
  onSearch(searchText: string) {

    // customer list
    this.integrationService.getCustomerList(searchText).subscribe(x => {
      this.items$.next(x);
    });
  }

  // select
  select(item: any) {   
    this.onSelect.emit(item);
    this.closeDialog();
  }

  // dismiss
  dismiss() {
    this.closeDialog();
  }
}
