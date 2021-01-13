import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './apps/app-container.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';
import { AppAuthGuard } from './app-auth.guard';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { LogoutPageComponent } from './auth/pages/logout-page/logout-page.component';
import { ForgotPasswordPageComponent } from './auth/pages/forgot-password-page/forgot-password-page.component';
import { SetupPasswordPageComponent } from './auth/pages/setup-password-page/setup-password-page.component';
import { ForgotPasswordSuccessPageComponent } from './auth/pages/forgot-password-success-page/forgot-password-success-page.component';
import { SetupPasswordSuccessPageComponent } from './auth/pages/setup-password-success-page/setup-password-success-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent
  },
  {
    path: 'forgot-password-success',
    component: ForgotPasswordSuccessPageComponent
  },
  {
    path: 'setup-password',
    component: SetupPasswordPageComponent
  },  
  {
    path: 'setup-password-success',
    component: SetupPasswordSuccessPageComponent
  },

  
  { 
    path: 'app',  
    component: AppContainerComponent,
    canActivate: [AppAuthGuard],
    
    children: [      
      {
        path: 'example',        
        loadChildren: () => import('./apps/example/example-app.module').then(m => m.ExampleAppModule)
      },
      {
        path: 'preventative-maintenance',
        loadChildren: () => import('./apps/pm/pm-app.module').then(m => m.PmAppModule)
      },
      {
        path: 'admin',        
        loadChildren: () => import('./apps/admin/admin-app.module').then(m => m.AdminAppModule)
      },
      {
        path: '',        
        component: HomePageComponent
      }
    ] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
