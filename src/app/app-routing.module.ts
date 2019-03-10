import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './apps/app-container.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  { 
    path: 'app',  
    component: AppContainerComponent,
    //todo: canActivate: [AuthGuard],
    
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
