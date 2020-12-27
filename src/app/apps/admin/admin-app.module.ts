import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminContainerComponent } from './containers/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavComponent } from './components/shared/admin-nav/admin-nav.component';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/common/app-common.module';
import { AdminMenuItemsService } from './services/admin-menu-items.service';

@NgModule({
  declarations: [
    AdminHomePageComponent,
    AdminContainerComponent, 
    AdminNavComponent, 
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    AdminMenuItemsService
  ]
})
export class AdminAppModule { }
