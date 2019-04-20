import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationBarComponent } from './foundation/components/notification-bar/notification-bar.component';
import { AppFoundationModule } from './foundation/app-foundation.module';
import { UserContextService } from './common/services/user-context.service';
import { LoginComponent } from './auth/components/login/login.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    HomeTilesComponent,
    HomePageComponent,
    HeaderComponent,
    HeaderNavComponent,
    FooterComponent,
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    AppFoundationModule,
    NgbModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    AppContextService,
    LayoutContextService,
    UserContextService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
