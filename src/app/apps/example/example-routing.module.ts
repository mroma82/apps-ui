import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { ExampleViewPageComponent } from './pages/example-view-page/example-view-page.component';
import { ExampleEditPageComponent } from './pages/example-edit-page/example-edit-page.component';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';

// example routing
const routes: Routes = [
  {
      path: '',
      component: ExampleContainerComponent,
      children: [
          { path: '', component: ExampleListPageComponent },
          { path: 'mytasks', component: ExampleListPageComponent, data: { isMyTasks: true } },
          { path: 'view/:id', component: ExampleViewPageComponent },
          { path: 'edit/:id', component: ExampleEditPageComponent, canActivate: [RecordLockGuard] }
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
    recordLock: RecordLockGuard
  ) {
    recordLock.setContextType(1);
  }
}
