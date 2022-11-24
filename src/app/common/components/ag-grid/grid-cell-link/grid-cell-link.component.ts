import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid-cell-link',
  templateUrl: './grid-cell-link.component.html',
  styleUrls: ['./grid-cell-link.component.scss']
})
export class GridCellLinkComponent implements ICellRendererAngularComp {

  // options
  public params: ICellRendererParams;

  // model
  model = {
    text: "",
    viewUrl: "",
    editUrl: ""
  };

  // has edit
  userHasEdit$: Observable<boolean>;

  // init
  init(params: any) {
    this.params = params;

    // set params
    const model = params.getModel(params);
    this.model = model;
    this.userHasEdit$ = model.userHasEdit$;
  }

  // init
  agInit(params: any): void {
    this.init(params);
  }

  // refresh
  refresh(params: any): boolean {
    this.init(params);
    return true;
  }
}