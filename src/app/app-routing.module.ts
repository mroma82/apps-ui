import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './apps/app-container.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';
import { AppAuthGuard } from './app-auth.guard';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

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
    path: 'app',  
    component: AppContainerComponent,
    canActivate: [AppAuthGuard],
    
    children: [      
      {
        path: 'example',        
        loadChildren: './apps/example/example-app.module#ExampleAppModule'
      },
      {
        path: 'admin',        
        loadChildren: './apps/admin/admin-app.module#AdminAppModule'
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
