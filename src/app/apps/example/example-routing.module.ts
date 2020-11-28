import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';
import { ExampleViewEditPageComponent } from './pages/example-view-edit-page/example-view-edit-page.component';
import { ExampleParametersPageComponent } from './pages/example-parameters-page/example-parameters-page.component';

// example routing
const routes: Routes = [
  {
      path: '',
      component: ExampleContainerComponent,
      children: [
          { path: '', component: ExampleListPageComponent },
          { path: 'mytasks', component: ExampleListPageComponent, data: { isWorkflowAssigned: true } },
          { path: 'view/:id', component: ExampleViewEditPageComponent, data: { mode: "view" } },
          { path: 'edit/:id', component: ExampleViewEditPageComponent, data: { mode: "edit" }, canActivate: [RecordLockGuard] },
          { path: 'parameters', component: ExampleParametersPageComponent }
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecordLockGuard]
})
export class ExampleRoutingModule { 

  constructor(
    recordLock: RecordLockGuard,    
  ) {
    recordLock.setContextType(1);
  }
}
