import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  @Output('afterUpload') afterUpload = new EventEmitter<any>();

  // state
  state = {
    isDraggedOn: false
  };

  // new
  constructor() { }

  ngOnInit() {
  }

  // drag events
  allowDrop(ev) {
    this.state.isDraggedOn = true
    ev.preventDefault();
  }
  dragLeave() {
    this.state.isDraggedOn = false
  }
  drop(ev) {
    ev.preventDefault();
    this.state.isDraggedOn = false;

    // after upload
    this.afterUpload.emit(ev.dataTransfer.files);
    //this.upload(ev.dataTransfer.files)
  }

  // upload button
  upload(files) {      
    this.afterUpload.emit(files);
  }
}
