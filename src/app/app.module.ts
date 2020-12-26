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
import { UserContextService } from './common/services/user-context.service';
import { LoginComponent } from './auth/components/login/login.component';
import { DialogService } from './common/services/dialog.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

import { LogoutPageComponent } from './auth/pages/logout-page/logout-page.component';
import { ToastMessageContextService } from './common/services/toast-message-context.service';
import { HomeMyTasksComponent } from './apps/home/components/home-my-tasks/home-my-tasks.component';
import { AppsCoreModule } from './core/core.module';
import { ForgotPasswordPageComponent } from './auth/pages/forgot-password-page/forgot-password-page.component';
import { SetupPasswordPageComponent } from './auth/pages/setup-password-page/setup-password-page.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { SetupPasswordComponent } from './auth/components/setup-password/setup-password.component';
import { ForgotPasswordSuccessPageComponent } from './auth/pages/forgot-password-success-page/forgot-password-success-page.component';
import { SetupPasswordSuccessPageComponent } from './auth/pages/setup-password-success-page/setup-password-success-page.component';
import { InstanceContextService } from './common/services/instance-context.service';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    HomeTilesComponent,
    HomeMyTasksComponent,
    HomePageComponent,
    HeaderComponent,
    HeaderNavComponent,
    FooterComponent,
    LoginComponent,
    LoginPageComponent,
    LogoutPageComponent,
    ForgotPasswordPageComponent,
    SetupPasswordPageComponent,
    ForgotPasswordComponent,
    SetupPasswordComponent,
    ForgotPasswordSuccessPageComponent,
    SetupPasswordSuccessPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    AppFoundationModule,
    AppsCoreModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AppContextService,
    LayoutContextService,
    ToastMessageContextService,
    UserContextService,
    DialogService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
