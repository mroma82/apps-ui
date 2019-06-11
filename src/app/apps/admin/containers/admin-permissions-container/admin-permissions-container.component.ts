import { Component, OnInit } from '@angular/core';
import { PermissionsContextService } from '../../services/permissions/permissions-context.service';

@Component({
  selector: 'app-admin-permissions-container',
  templateUrl: './admin-permissions-container.component.html',
  styleUrls: ['./admin-permissions-container.component.scss'],
  providers: [
    PermissionsContextService
  ]
})
export class AdminPermissionsContainerComponent implements OnInit {

  constructor(
    private context : PermissionsContextService
  ) { }

  // init
  ngOnInit() {

    // refresh
    this.context.refreshData();
  }

}
