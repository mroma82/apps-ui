import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';

@Component({
  selector: 'app-admin-security-role-view-edit',
  templateUrl: './admin-security-role-view-edit.component.html',
  styleUrls: ['./admin-security-role-view-edit.component.scss']
})
export class AdminSecurityRoleViewEditComponent implements OnInit, OnDestroy {
  
  // state
  viewMode$ : Observable<boolean> = this.context.mode$.pipe(map(x => x == 'view'));

  // model
  viewModel : any = {
    record: {}
  };

  // subscriptions
  subs = new Subscription();  

  // new
  constructor(
    private context: EntityViewEditContextService    
  ) {         
  }
  
  // init
  ngOnInit() {    

    // subscribe to record changes
    this.subs.add(
      this.context.entityRecord$.subscribe(x => {        
        if(x) {          
          this.viewModel.record = x;                  
        }
      })
    );       
  }

  // destroy
  ngOnDestroy() {    
    this.subs.unsubscribe();
  }
}
