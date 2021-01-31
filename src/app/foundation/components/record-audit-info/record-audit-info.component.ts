import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-audit-info',
  templateUrl: './record-audit-info.component.html',
  styleUrls: ['./record-audit-info.component.scss']
})
export class RecordAuditInfoComponent implements OnInit {
  @Input() model : any;

  // new
  constructor() { }

  ngOnInit() {
  }

  // check if empty date
  isEmpty(userId: string) : boolean {
    return userId === "00000000-0000-0000-0000-000000000000";
  }

}
