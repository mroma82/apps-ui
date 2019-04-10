import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './apps/app-container.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';
import { AppAuthGuard } from './app-auth.guard';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
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
        path: '',        
        component: AppContainerComponent
      }
    ] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
