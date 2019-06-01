import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminDropDownListPageComponent } from './pages/admin-drop-down-list-page/admin-drop-down-list-page.component';
import { AdminDropDownEditPageComponent } from './pages/admin-drop-down-edit-page/admin-drop-down-edit-page.component';
import { AdminPermissionsEditPageComponent } from './pages/permissions/admin-permissions-edit-page/admin-permissions-edit-page.component';
import { AdminPermissionsListPageComponent } from './pages/permissions/admin-permissions-list-page/admin-permissions-list-page.component';
import { AdminDropDownListComponent } from './components/drop-down/admin-drop-down-list/admin-drop-down-list.component';
import { AdminDropDownEditComponent } from './components/drop-down/admin-drop-down-edit/admin-drop-down-edit.component';
import { AdminPermissionsListComponent } from './components/permissions/admin-permissions-list/admin-permissions-list.component';
import { AdminPermissionsEditComponent } from './components/permissions/admin-permissions-edit/admin-permissions-edit.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavComponent } from './components/shared/admin-nav/admin-nav.component';
import { PermissionsContextService } from './services/permissions/permissions-context.service';
import { AdminPermissionsContainerComponent } from './containers/admin-permissions-container/admin-permissions-container.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminHomePageComponent, AdminDropDownListPageComponent, AdminDropDownEditPageComponent, AdminPermissionsEditPageComponent, AdminPermissionsListPageComponent, AdminDropDownListComponent, AdminDropDownEditComponent, AdminPermissionsListComponent, AdminPermissionsEditComponent, AdminContainerComponent, AdminNavComponent, AdminPermissionsContainerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    PermissionsContextService
  ]
})
export class AdminAppModule { }
