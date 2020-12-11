import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityCreateContextService } from 'src/app/core/services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-admin-security-role-create',
  templateUrl: './admin-security-role-create.component.html',
  styleUrls: ['./admin-security-role-create.component.scss']
})
export class AdminSecurityRoleCreateComponent implements OnInit, OnDestroy {

  // model
  model : any = {};  

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private context: EntityCreateContextService    
  ) { 

    // sub to model
    this.context.model$.subscribe(x => this.model = x);
  }

  // init
  ngOnInit() {    
  }

  // cleanup
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
