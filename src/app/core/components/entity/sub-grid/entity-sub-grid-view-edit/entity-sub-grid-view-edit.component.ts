import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';

@Component({
  selector: 'app-entity-sub-grid-view-edit',
  templateUrl: './entity-sub-grid-view-edit.component.html',
  styleUrls: ['./entity-sub-grid-view-edit.component.scss']
})
export class EntitySubGridViewEditComponent implements OnInit, OnDestroy {  
  @ViewChild("formContainer", { read: ViewContainerRef, static: true }) formContainer;
  componentRef: any;

  // new
  constructor(
    private entityConfig: EntityConfigurationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    
  }

  // init
  ngOnInit() {    

    // create the component
    if(this.entityConfig.viewEditFormComponent)
      this.setupForm(this.entityConfig.viewEditFormComponent);
  }

  ngOnDestroy() {    
    //todo: if(this.componentRef)
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