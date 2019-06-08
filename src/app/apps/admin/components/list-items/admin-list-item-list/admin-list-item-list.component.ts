import { Component, OnInit } from '@angular/core';
import { AdminListItemContextService } from '../../../services/list-items/admin-list-item-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-list-item-list',
  templateUrl: './admin-list-item-list.component.html',
  styleUrls: ['./admin-list-item-list.component.scss']
})
export class AdminListItemListComponent implements OnInit {

  // obsertables
  listItemTypeList$ : Observable<any>;

  // state
  state = {
    addPending: false
  };

  // model
  model = {
    newTypeDescription: ""
  };

  // new
  constructor(
    private context: AdminListItemContextService
  ) { }

  // init
  ngOnInit() {

    // set list
    this.listItemTypeList$ = this.context.listItemTypeList$;
  }

  // add type
  addType() {
    this.state.addPending = true;
    this.model.newTypeDescription = "";
  }

  // add type commit
  addTypeCommit() {
    
    // save
    this.context.createType({
      description: this.model.newTypeDescription
    }).subscribe(x =>{
      this.state.addPending = false;
    });
  }
  
  // add type cancel
  addTypeCancel() {
    this.state.addPending = false;
  }

  // update
  updateType(item: any) {
    item.updateTypeDescription = item.description;
    item.updatePending = true;
  }

  // update commit
  updateTypeCommit(item: any) {

    // update
    this.context.updateType({
      id: item.id,
      description: item.updateTypeDescription
    }).subscribe(x => {
      item.updatePending = false;
    });
  }

  // update cancel
  updateTypeCancel(item: any) {
    item.updatePending = false;
  }
}
