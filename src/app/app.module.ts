import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommonModule } from './common/app-common.module';
import { AppContainerComponent } from './apps/app-container.component';
import { HomeTilesComponent } from './apps/home/components/home-tiles/home-tiles.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { HeaderNavComponent } from './layout/components/header-nav/header-nav.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LayoutContextService } from './layout/services/layout-context.service';
import { AppContextService } from './app-context.service';
import { AppFoundationModule } from './foundation/app-foundation.module';
import { DialogService } from './common/services/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    HomeTilesComponent,
    HomePageComponent,
    HeaderComponent,
    HeaderNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    AppFoundationModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  providers: [
    AppContextService,
    LayoutContextService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
