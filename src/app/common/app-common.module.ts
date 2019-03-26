import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHttpClientService } from './services/app-http-client.service';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';

@NgModule({
  declarations: [
    DragDropComponent
  ],
  providers: [
    AppHttpClientService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DragDropComponent
  ]
})
export class AppCommonModule { }
