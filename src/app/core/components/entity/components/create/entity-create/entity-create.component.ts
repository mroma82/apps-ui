import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EventEmitter } from 'protractor';
import { EntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.scss']
})
export class EntityCreateComponent implements OnInit, OnDestroy {  
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
    this.setupForm(this.entityConfig.createFormComponent);
  }

  ngOnDestroy() {    
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
