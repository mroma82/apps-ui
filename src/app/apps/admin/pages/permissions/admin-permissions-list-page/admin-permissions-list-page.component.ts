import { Component, OnInit } from '@angular/core';
import { PermissionsContextService } from '../../../services/permissions/permissions-context.service';

@Component({
  selector: 'app-admin-permissions-list-page',
  templateUrl: './admin-permissions-list-page.component.html',
  styleUrls: ['./admin-permissions-list-page.component.scss']
})
export class AdminPermissionsListPageComponent implements OnInit {

  // new
  constructor(
    private context: PermissionsContextService
  ) { }

  // init
  ngOnInit() {
    this.context.refreshData();
  }

}
