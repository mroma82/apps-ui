import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleViewEditContextService } from 'src/app/apps/example/services/example-view-edit-context.service';
import { EntityViewEditContextService } from 'src/app/core/services/entity/view-edit/entity-view-edit-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { ExampleViewEditFormComponent } from 'src/app/apps/example/components/example-view-edit-form/example-view-edit-form.component';
import { ENTITY_CONFIG, IEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { Observable } from 'rxjs';
import { AppContextService } from 'src/app/app-context.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entity-view-edit-page-generic',
  templateUrl: './entity-view-edit-page-generic.component.html',
  styleUrls: ['./entity-view-edit-page-generic.component.scss'],
  providers: [
    RecordContextService,
    EntityViewEditContextService    
  ]
})
export class EntityViewEditPageGenericComponent implements OnInit {  

  // define model
  model = {
    id: "",
    mode: null,
    
    entityTypeId: this.entityConfig.entityTypeId,
    workflow: this.entityConfig.workflow,
    listPageUrl: this.entityConfig.rootUrl
  };

  // state
  entityRecord$ : Observable<any> = this.viewEditContext.entityRecord$;

  // new
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private recordContext: RecordContextService,
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private viewEditContext : EntityViewEditContextService,
    private appContext: AppContextService     
  ) {   
    
  }

  // init
  ngOnInit() {
    
    // get the id
    let params = this.activatedRoute.snapshot.paramMap;
    let data = this.activatedRoute.snapshot.data;
    this.model.id = params.get('id');      
    this.model.mode = data.mode;

    this.model.workflow = this.entityConfig.workflow;

    // set record
    this.recordContext.setRecord(this.entityConfig.entityTypeId, this.model.id);
    this.viewEditContext.setId(this.model.id);    

    // hack
    switch(this.model.mode) {
      case "view": this.viewEditContext.setMode("view"); break;
      case "edit": this.viewEditContext.setMode("edit"); break;
    }    

    // set title
    this.entityRecord$.pipe(map(x => this.entityConfig.recordDescription(x))).subscribe(x => {
      this.appContext.Layout.setTitle(x);
    });
  }  

  // edit
  edit() {
    this.router.navigateByUrl(`${this.entityConfig.rootUrl}/edit/${this.model.id}`)
  }

  // save
  save() {

    // update
    this.viewEditContext.update().subscribe();
  }

  // save close
  saveClose() {

    // update, if ok, go back to listing
    this.viewEditContext.update().subscribe(x => {
      if(x) {
        this.router.navigateByUrl(this.entityConfig.rootUrl);
      }
    });
  }

  // delete
  delete() {

    // delete, if ok, go back to listing
    this.viewEditContext.delete().subscribe(x => {
      if(x) {
        this.router.navigateByUrl(this.entityConfig.rootUrl);
      }
    });
  }

  // copy
  copy() {
    
    // copy, then check if ok
    /*this.viewEditContext.copy(false).subscribe(result => {
      if(result.success) {
        this.router.navigateByUrl(`/app/example/edit/${result.id}`)
      }          
    });      */
  }

}
