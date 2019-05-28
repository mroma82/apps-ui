import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseDialog } from '../../abstractions/base-dialog';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntegrationService } from '../../services/integration.service';

@Component({
  selector: 'app-vendor-lookup-dialog',
  templateUrl: './vendor-lookup-dialog.component.html',
  styleUrls: ['./vendor-lookup-dialog.component.scss']
})
export class VendorLookupDialogComponent extends BaseDialog {
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
    this.integrationService.getVendorList(searchText).subscribe(x => {
      this.items$.next(x);
    });
  }

  // select
  select(item: any) {   
    this.onSelect.emit(item);
    this.closeDialog();
  }
}
