import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExampleListContextService } from '../../services/example-list-context.service';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit {
  pageSize: number;

  // obserables
  list$ : Observable<any>;
  
  // new
  constructor(
    private context: ExampleListContextService
  ) { 
    this.list$ = context.list$;
    this.pageSize = context.PAGE_SIZE;
  }

  //
  ngOnInit() {
  }

  // on page
  onPage(e) {
    this.context.setPage(e.offset + 1);    
  }

  onSort(e) {  
    console.log(e);  
    if(e.sorts.length) {
      this.context.setSort({
        field: e.sorts[0].prop,
        isDescending: e.sorts[0].dir === "desc"
      })
    }
  }

  // get statu stext todo: move to pipe
  getStatusText(status: number) {
    switch(status) {
      case 0: return "None";
      case 1: return "In Process";
      case 2: return "Approved";
    }

    return "";

  }

}
