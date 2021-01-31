import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEntityViewEditComponent } from 'src/app/core/services/entity/abstractions/base-entity-view-edit-component';
import { IEntitySubGridConfigurationService } from 'src/app/core/services/entity/sub-grid/entity-sub-grid-configuration.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { ExampleListsService } from '../../services/example-lists.service';
import { ExampleLineCreateComponent } from '../example-line-create/example-line-create.component';
import { ExampleLineViewEditComponent } from '../example-line-view-edit/example-line-view-edit.component';


@Component({
  selector: 'app-example-view-edit-form',
  templateUrl: './example-view-edit-form.component.html',
  styleUrls: ['./example-view-edit-form.component.scss']
})
export class ExampleViewEditFormComponent extends BaseEntityViewEditComponent {
  
  // lists
  statusList$ : Observable<any>;  
  statusValueList$ : Observable<any>;  
  userList$ : Observable<any>;
  departmentList$ : Observable<any>;

  // new
  constructor(
    context: EntityViewEditContextService,
    private lists: ExampleListsService    
  ) {   
    super(context);

    // lists
    this.statusList$ = lists.statusList$
    this.statusValueList$ = lists.statusValueList$;
    this.userList$ = lists.userList$;    
    this.departmentList$ = lists.departmentList$;
  }

  // select
  setCustomer(customer) {
    this.model.customerId = customer.customerId;
    this.model.customerName = customer.customerName;
  }
}
