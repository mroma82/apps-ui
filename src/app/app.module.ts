import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommonModule } from './common/app-common.module';
import { AppContainerComponent } from './apps/app-container.component';
import { HomeTilesComponent } from './apps/home/components/home-tiles/home-tiles.component';
import { HomePageComponent } from './apps/home/pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    HomeTilesComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
