import { Component, OnInit } from '@angular/core';
import { PurchaseReqCreateContextService } from '../../../services/purchase-req-create-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-req-create',
  templateUrl: './purchase-req-create.component.html',
  styleUrls: ['./purchase-req-create.component.scss']
})
export class PurchaseReqCreateComponent implements OnInit {

  // model
  model : any;

  // state
  state = {
    errorText: ""
  };

  // new
  constructor(
    private context: PurchaseReqCreateContextService,
    private router: Router
  ) { }

  // init
  ngOnInit() {
    this.model = {};
  }

  // create
  create() {
    
    // clear error
    this.state.errorText = "";

    // create
    this.context.create(this.model).subscribe(x => {
      console.log(x);
      if(x.success) {
        this.context.closeDialog();
        this.router.navigateByUrl(`/app/purchase-req/edit/${x.id}`);
      } else {
        this.state.errorText = x.text;
      }
    });
  }
}
