import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHttpClientService } from './services/app-http-client.service';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ContextTypeRouteResolverService } from './services/context-type-route-resolver.service';

@NgModule({
  declarations: [
    DragDropComponent
  ],
  providers: [
    AppHttpClientService,
    ContextTypeRouteResolverService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDropComponent
  ]
})
export class AppCommonModule { }
