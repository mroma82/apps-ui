import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHttpClientService } from './services/app-http-client.service';

@NgModule({
  declarations: [],
  providers: [
    AppHttpClientService
  ],
  imports: [
    CommonModule
  ]
})
export class AppCommonModule { }
