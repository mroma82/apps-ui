import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';

@Component({
  selector: 'app-entity-single-record-view-edit',
  templateUrl: './entity-single-record-view-edit.component.html',
  styleUrls: ['./entity-single-record-view-edit.component.scss']
})
export class EntitySingleRecordViewEditComponent implements OnInit, OnDestroy {  
  @ViewChild("formContainer", { read: ViewContainerRef }) formContainer;
  componentRef: any;

  // new
  constructor(
    private entityConfig: EntityConfigurationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    
  }

  // init
  ngOnInit() {    
    if(this.entityConfig.viewEditFormComponent)
      this.setupForm(this.entityConfig.viewEditFormComponent);
  }

  ngOnDestroy() {    
    //if(this.componentRef)
      //this.componentRef.
  }

  // sets up the form
  setupForm(componentType) {

    // clear the form, then add the form
    this.formContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = this.formContainer.createComponent(factory);
  }
}