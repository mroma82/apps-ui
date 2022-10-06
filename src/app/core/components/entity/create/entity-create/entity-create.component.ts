import { Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ENTITY_CONFIG, IEntityConfigurationService } from 'src/app/core/services/entity/entity-configuration.service';
import { EntityCreateContextService } from '../../../../services/entity/create/entity-create-context.service';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.scss']
})
export class EntityCreateComponent implements OnInit, OnDestroy {
  @ViewChild("formContainer", { read: ViewContainerRef, static: true }) formContainer;
  componentRef: any;

  // new
  constructor(
    @Inject(ENTITY_CONFIG) private entityConfig: IEntityConfigurationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private context: EntityCreateContextService
  ) {

  }

  // init
  ngOnInit() {

    // create the component
    if (this.entityConfig.createFormComponent)
      this.setupForm(this.entityConfig.createFormComponent);
  }

  ngOnDestroy() {
    // todo: if(this.componentRef)
    //this.componentRef.
  }

  // sets up the form
  setupForm(componentType) {

    // clear the form, then add the form
    this.formContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = this.formContainer.createComponent(factory);
  }

  // submit
  submit() {

    // try to create
    this.context.create().subscribe(ok => {
      if (ok)
        this.context.closeDialog();
    })
  }
}
