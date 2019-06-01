import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionsContextService } from '../../../services/permissions/permissions-context.service';

@Component({
  selector: 'app-admin-permissions-list',
  templateUrl: './admin-permissions-list.component.html',
  styleUrls: ['./admin-permissions-list.component.scss']
})
export class AdminPermissionsListComponent implements OnInit {

  // observables
  permissionsList$ : Observable<any>;

  // new
  constructor(
    private context: PermissionsContextService
  ) { }

  // init
  ngOnInit() {
    this.permissionsList$ = this.context.permissions$;
  }

}
