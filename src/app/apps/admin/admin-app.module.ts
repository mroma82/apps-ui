import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminPermissionsEditPageComponent } from './pages/permissions/admin-permissions-edit-page/admin-permissions-edit-page.component';
import { AdminPermissionsListPageComponent } from './pages/permissions/admin-permissions-list-page/admin-permissions-list-page.component';
import { AdminPermissionsListComponent } from './components/permissions/admin-permissions-list/admin-permissions-list.component';
import { AdminPermissionsEditComponent } from './components/permissions/admin-permissions-edit/admin-permissions-edit.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavComponent } from './components/shared/admin-nav/admin-nav.component';
import { PermissionsContextService } from './services/permissions/permissions-context.service';
import { AdminPermissionsContainerComponent } from './containers/admin-permissions-container/admin-permissions-container.component';
import { FormsModule } from '@angular/forms';
import { AdminListItemContainerComponent } from './containers/admin-list-item-container/admin-list-item-container.component';
import { AdminListItemListComponent } from './components/list-items/admin-list-item-list/admin-list-item-list.component';
import { AdminListItemEditComponent } from './components/list-items/admin-list-item-edit/admin-list-item-edit.component';
import { AdminListItemEditPageComponent } from './pages/list-items/admin-list-item-edit-page/admin-list-item-edit-page.component';
import { AdminListItemListPageComponent } from './pages/list-items/admin-list-item-list-page/admin-list-item-list-page.component';
import { AppCommonModule } from 'src/app/common/app-common.module';

@NgModule({
  declarations: [
    AdminHomePageComponent,
    AdminPermissionsEditPageComponent, 
    AdminPermissionsListPageComponent, 
    AdminPermissionsListComponent, 
    AdminPermissionsEditComponent, 
    AdminContainerComponent, 
    AdminNavComponent, 
    AdminPermissionsContainerComponent, 
    AdminListItemContainerComponent, 
    AdminListItemListComponent, 
    AdminListItemEditComponent, 
    AdminListItemEditPageComponent, 
    AdminListItemListPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    PermissionsContextService
  ]
})
export class AdminAppModule { }
