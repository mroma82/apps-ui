import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminListItemContextService } from '../../../services/list-items/admin-list-item-context.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list-item-edit',
  templateUrl: './admin-list-item-edit.component.html',
  styleUrls: ['./admin-list-item-edit.component.scss']
})
export class AdminListItemEditComponent implements OnInit, OnDestroy {

  // model
  model = {
    items: []
  };

  // observables
  type$ : Observable<any>;

  // subscriptions
  onModelChange$ : Subscription;
  
  // new
  constructor(
    private context: AdminListItemContextService,
    private router: Router
  ) { 

    // model change
    this.onModelChange$ = this.context.listItemsList$.subscribe(x => {
      this.model.items = x;
    });
  }

  // init
  ngOnInit() {
    this.type$ = this.context.listItemTypeSelected$;
  }

  // cleanup
  ngOnDestroy() {
    this.onModelChange$.unsubscribe();
  }

  // delete item
  deleteItem(item: any) {
    item.isDeleted = true;
  }

  // add item
  addItem() {
    this.model.items.push({});
  }

  // save
  save() {
    this.context.save().subscribe(x => {
      if(x)
        this.router.navigateByUrl("/app/admin/list-items");
    })
  }
}
