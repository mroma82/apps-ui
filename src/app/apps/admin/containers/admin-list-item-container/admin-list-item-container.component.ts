import { Component, OnInit } from '@angular/core';
import { AdminListItemContextService } from '../../services/list-items/admin-list-item-context.service';

@Component({
  selector: 'app-admin-list-item-container',
  templateUrl: './admin-list-item-container.component.html',
  styleUrls: ['./admin-list-item-container.component.scss'],
  providers: [
    AdminListItemContextService
  ]
})
export class AdminListItemContainerComponent implements OnInit {

  // new
  constructor(
    private context: AdminListItemContextService
  ) { }

  // init
  ngOnInit() {
    // refresh
    this.context.refreshTypes();
  }

}
