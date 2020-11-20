import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityViewEditComponent } from './components/entity/view-edit/entity-view-edit/entity-view-edit.component';
import { EntityViewEditPageGenericComponent } from './components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';
import { AppCommonModule } from '../common/app-common.module';
import { AppFoundationModule } from '../foundation/app-foundation.module';

@NgModule({
  declarations: [    
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent    
  ],
  imports: [
    CommonModule,     
    AppCommonModule,
    AppFoundationModule,    
  ],
  exports: [
    EntityViewEditComponent,
    EntityViewEditPageGenericComponent    
  ]
})
export class AppsCoreModule { }
