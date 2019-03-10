import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-example-view-edit',
  templateUrl: './example-view-edit.component.html',
  styleUrls: ['./example-view-edit.component.scss']
})
export class ExampleViewEditComponent implements OnInit {
  @Input() id: string;
  
  constructor() { }

  ngOnInit() {
  }

}
