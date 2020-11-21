import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityViewEditComponent } from './components/entity/view-edit/entity-view-edit/entity-view-edit.component';
import { EntityViewEditPageGenericComponent } from './components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';
import { AppCommonModule } from '../common/app-common.module';
import { AppFoundationModule } from '../foundation/app-foundation.module';
import { EntityCreateModalComponent } from './components/entity/create/entity-create-modal/entity-create-modal.component';
import { EntityContainerComponent } from './components/entity/container/entity-container/entity-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [    
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,    
    EntityCreateModalComponent,
    EntityContainerComponent    
  ],
  imports: [
    CommonModule,     
    RouterModule,
    AppCommonModule,
    AppFoundationModule,    
  ],
  exports: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent,
    EntityContainerComponent    
  ]
})
export class AppsCoreModule { }
