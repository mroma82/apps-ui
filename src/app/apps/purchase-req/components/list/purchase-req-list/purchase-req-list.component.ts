import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseReqListContextService } from '../../../services/purchase-req-list-context.service';

@Component({
  selector: 'app-purchase-req-list',
  templateUrl: './purchase-req-list.component.html',
  styleUrls: ['./purchase-req-list.component.scss']
})
export class PurchaseReqListComponent implements OnInit {
  
  // obserables
  list$ : Observable<any>;
  pageSize$ : Observable<number>;

  // new
  constructor(
    private context: PurchaseReqListContextService
  ) { }

  // init
  ngOnInit() {
    this.list$ = this.context.list$;
    this.pageSize$ = this.context.pageSize$;
  }

  // on page
  onPage(e) {
    this.context.setPage(e.offset + 1);    
  }

  // on sort
  onSort(e) {      
    if(e.sorts.length) {
      this.context.setSort({
        field: e.sorts[0].prop,
        isDescending: e.sorts[0].dir === "desc"
      })
    }
  }
}
