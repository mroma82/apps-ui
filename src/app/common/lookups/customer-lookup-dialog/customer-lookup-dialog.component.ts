import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LookupDialogContainerComponent } from '../containers/lookup-dialog-container/lookup-dialog-container.component';
import { BaseDialog } from '../../abstractions/base-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-lookup-dialog',
  templateUrl: './customer-lookup-dialog.component.html',
  styleUrls: ['./customer-lookup-dialog.component.scss']
})
export class CustomerLookupDialogComponent extends BaseDialog {
  @Output() onSelect = new EventEmitter<any>();

  items$ : Observable<any>;

  // new
  constructor(
    modalService : NgbModal
  ) {
    super(modalService);
  }

  ngOnInit() {
    this.items$ = of([
      { customerId: "C1", customerName: "Customer 1"},
      { customerId: "C2", customerName: "Customer 2"},
      { customerId: "C3", customerName: "Customer 3"},
      { customerId: "C4", customerName: "Customer 4"},
      { customerId: "C5", customerName: "Customer 5"},
      { customerId: "C6", customerName: "Customer 6"},
      { customerId: "C7", customerName: "Customer 7"},
      { customerId: "C8", customerName: "Customer 8"},
      { customerId: "C9", customerName: "Customer 9"},
      { customerId: "C10", customerName: "Customer 10"},
      { customerId: "C11", customerName: "Customer 11"},
      { customerId: "C12", customerName: "Customer 12"},
    ]);
  }
  
  // on search
  onSearch(searchText) {
    console.log(`Search: ${searchText}`);    
  }

  // select
  select(item: any) {   
    this.onSelect.emit(item);
    this.closeDialog();
  }
}
