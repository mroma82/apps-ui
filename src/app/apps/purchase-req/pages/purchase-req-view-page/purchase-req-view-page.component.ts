import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { PurchaseReqViewEditContextService } from '../../services/purchase-req-view-edit-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-req-view-page',
  templateUrl: './purchase-req-view-page.component.html',
  styleUrls: ['./purchase-req-view-page.component.scss'],
  providers: [
    RecordContextService,
    PurchaseReqViewEditContextService
  ]
})
export class PurchaseReqViewPageComponent implements OnInit, OnDestroy {
  readonly contextType = 1000;

  // define model
  model = {
    id: ""    
  };

  // subscriptions
  onRouteChange$ : Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private recordContext: RecordContextService,
    private viewEditContext: PurchaseReqViewEditContextService
  ) {   
    
  }

  // init
  ngOnInit() {
    
    // get the id
    this.onRouteChange$ = this.activatedRoute.paramMap.subscribe(x => {
      this.model.id = x.get('id');
      
      // set record
      this.recordContext.setRecordContext(this.contextType, this.model.id);
      this.viewEditContext.setId(this.model.id);
    });        
  }

  // clean up
  ngOnDestroy() {
    this.onRouteChange$.unsubscribe();
  }

  // edit
  edit() {
    this.router.navigateByUrl(`/app/purchase-req/edit/${this.model.id}`)
  }
}
