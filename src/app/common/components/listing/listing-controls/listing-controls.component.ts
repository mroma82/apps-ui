import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listing-controls',
  templateUrl: './listing-controls.component.html',
  styleUrls: ['./listing-controls.component.scss']
})
export class ListingControlsComponent implements OnInit {
  @Output() onRefresh = new EventEmitter();
  @Output() onSetPageSize = new EventEmitter<number>();

  // constants
  readonly PAGE_SIZE_MAX = 99999;

  // define model
  model = {
    pageSize: 25
  };

  constructor() { }

  ngOnInit() {
  }

  // init model
  initModel(model : any) {
    this.model.pageSize = model.pageSize;
  }

  // set page size
  setPageSize(pageSize: number) {
    this.model.pageSize = pageSize;
    this.onSetPageSize.emit(this.model.pageSize);
  }

  // refresh
  refresh() {
    this.onRefresh.emit();
  }
}
