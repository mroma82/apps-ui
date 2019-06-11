import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminListItemContextService } from '../../../services/list-items/admin-list-item-context.service';

@Component({
  selector: 'app-admin-list-item-edit-page',
  templateUrl: './admin-list-item-edit-page.component.html',
  styleUrls: ['./admin-list-item-edit-page.component.scss']
})
export class AdminListItemEditPageComponent implements OnInit {

  // subscriptions
  onRouteChange$ : Subscription;

  // new
  constructor(
    private activatedRoute: ActivatedRoute,
    private context: AdminListItemContextService
  ) { 

    // reoute change
    this.onRouteChange$ = this.activatedRoute.paramMap.subscribe(x => {
      this.context.setItemTypeSelected(x.get('key'));
    })
  }

  // init
  ngOnInit() {
  }

  // cleanup
  ngOnDestroy() {
    this.onRouteChange$.unsubscribe();
  }
}
