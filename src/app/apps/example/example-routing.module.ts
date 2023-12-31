import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExampleContainerComponent } from './containers/example-container/example-container.component';
import { ExampleListPageComponent } from './pages/example-list-page/example-list-page.component';
import { RecordLockGuard } from 'src/app/foundation/record-lock-guard.service';
import { ExampleViewEditPageComponent } from './pages/example-view-edit-page/example-view-edit-page.component';
import { ExampleParametersPageComponent } from './pages/example-parameters-page/example-parameters-page.component';
import { EntityTypes } from 'src/app/core/services/entity/entity-types';
import { EntityRouteModule } from 'src/app/core/services/entity/entity-route.module';
import { ExampleDashboardPageComponent } from './pages/example-dashboard-page/example-dashboard-page.component';

// route options
const routeOptions = {
  homeRedirect: "dashboard",

  containerComponent: ExampleContainerComponent,

  extraRoutes: [
    { path: 'dashboard', component: ExampleDashboardPageComponent },
    { path: 'mytasks', component: ExampleListPageComponent, data: { isWorkflowAssigned: true } },
    { path: 'parameters', component: ExampleParametersPageComponent }
  ]
}

@NgModule({
  imports: [
    EntityRouteModule.forOptions(routeOptions)
  ],
  exports: [RouterModule],
  providers: [RecordLockGuard]
})
export class ExampleRoutingModule {

  constructor(
    recordLock: RecordLockGuard,
  ) {
    recordLock.setContextType(EntityTypes.Example);
  }
}
