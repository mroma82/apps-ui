import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pm-activity-view-edit-form',
  templateUrl: './pm-activity-view-edit-form.component.html',
  styleUrls: ['./pm-activity-view-edit-form.component.scss']
})
export class PmActivityViewEditFormComponent implements OnInit {
  @Input() model: any;

  constructor() { }

  ngOnInit(): void {
  }

}
