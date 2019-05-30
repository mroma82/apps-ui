import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { PurchaseReqViewEditContextService } from '../../services/purchase-req-view-edit-context.service';

@Component({
  selector: 'app-purchase-req-edit-page',
  templateUrl: './purchase-req-edit-page.component.html',
  styleUrls: ['./purchase-req-edit-page.component.scss']
})
export class PurchaseReqEditPageComponent implements OnInit {
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

  // save
  save() {

    // update
    this.viewEditContext.update().subscribe(x => {
      if(x) {
        this.viewEditContext.refreshData();
      }
    });
  }

  // save close
  saveClose() {
    
    // update, if ok, go back to listing
    this.viewEditContext.update().subscribe(x => {
      if(x) {                
        this.redirectToListing();
      }
    });
  }

  // delete
  delete() {

    // delete, if ok, go back to listing
    this.viewEditContext.delete().subscribe(x => {
      if(x) {
        this.redirectToListing();
      }
    });
  }

  // redirect to listing
  redirectToListing() {
    if(this.viewEditContext.isTemplate()) {
      this.router.navigateByUrl('/app/purchase-req/my-templates');
    } else {
      this.router.navigateByUrl('/app/purchase-req');      
    }
  }
}
