import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleViewEditContextService } from 'src/app/apps/example/services/example-view-edit-context.service';
import { EntityConfigurationService } from 'src/app/common/services/entity/entity-configuration.service';
import { EntityViewEditContextService } from 'src/app/common/services/entity/view-edit/entity-view-edit-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';

@Component({
  selector: 'app-entity-view-edit-page-generic',
  templateUrl: './entity-view-edit-page-generic.component.html',
  styleUrls: ['./entity-view-edit-page-generic.component.scss'],
  providers: [
    RecordContextService,
    ExampleViewEditContextService
  ]
})
export class EntityViewEditPageGenericComponent implements OnInit {

  // define model
  model = {
    id: "",
    mode: null,
    
    contextType: this.entityConfig.contextType,
    workflow: this.entityConfig.workflow
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private recordContext: RecordContextService,
    private entityConfig: EntityConfigurationService,
    private viewEditContext : EntityViewEditContextService
    //private viewEditContext: ExampleViewEditContextService    
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
    this.recordContext.setRecordContext(this.entityConfig.contextType, this.model.id);
    this.viewEditContext.setId(this.model.id);    

    // hack
    switch(this.model.mode)
    {
      case "view": this.viewEditContext.setMode("view"); break;
      case "edit": this.viewEditContext.setMode("edit"); break;
    }
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
