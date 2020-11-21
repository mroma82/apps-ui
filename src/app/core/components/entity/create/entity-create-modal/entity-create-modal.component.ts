import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseDialog } from 'src/app/common/abstractions/base-dialog';
import { EntityConfigurationService } from 'src/app/common/services/entity/entity-configuration.service';
import { EntityCreateContextService } from 'src/app/core/entity/create/entity-create-context.service';

@Component({
  selector: 'app-entity-create-modal',
  templateUrl: './entity-create-modal.component.html',
  styleUrls: ['./entity-create-modal.component.scss']
})
export class EntityCreateModalComponent extends BaseDialog {
  @ViewChild("formContainer", { read: ViewContainerRef }) formContainer;
  componentRef: any;
  
  // new
  constructor(
    modelService: NgbModal,
    context: EntityCreateContextService,
    private entityConfig: EntityConfigurationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    super(modelService);

    // set open/close subscripton
    this.initOpenCloseSubscription(context.dialogOpen$);
  }
  
  // init
  ngOnInit() {

    // setup form 
    this.setupForm(this.entityConfig.createFormComponent);
  }

  // sets up the form
  setupForm(componentType) {

    // clear the form, then add the form
    this.formContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = this.formContainer.createComponent(factory);
  }

  //ngOnDestroy() { how
  //}
}

