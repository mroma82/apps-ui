import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntityContainerComponent } from 'src/app/core/components/entity/container/entity-container/entity-container.component';
import { EntityListingPageGenericComponent } from 'src/app/core/components/entity/listing/entity-listing-page-generic/entity-listing-page-generic.component';
import { EntityViewEditPageGenericComponent } from 'src/app/core/components/entity/view-edit/entity-view-edit-page-generic/entity-view-edit-page-generic.component';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';

const routes: Routes = [
  {
    path: '',
    component: EntityContainerComponent,
    children: [
        { path: '', component: EntityListingPageGenericComponent },        
        { path: 'view/:id', component: EntityViewEditPageGenericComponent, data: { mode: "view" } },
        { path: 'edit/:id', component: EntityViewEditPageGenericComponent, data: { mode: "edit" }, canActivate: [RecordLockGuard] }        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSecurityRolesRoutingModule { }
