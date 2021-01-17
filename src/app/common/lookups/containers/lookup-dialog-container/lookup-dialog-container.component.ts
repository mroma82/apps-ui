import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lookup-dialog-container',
  templateUrl: './lookup-dialog-container.component.html',
  styleUrls: ['./lookup-dialog-container.component.scss']
})
export class LookupDialogContainerComponent implements OnInit {
  @Input() title : string;
  @Output() onSearch = new EventEmitter<string>();
  @Output() onClose = new EventEmitter();

  // model
  model = {
    searchText: ""
  };  

  ngOnInit() {
  }

  // search
  search() {
    this.onSearch.emit(this.model.searchText);
  }

  // close
  close() {
    this.onClose.emit();
  }
}
