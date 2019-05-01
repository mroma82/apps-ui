import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppHttpClientService } from './services/app-http-client.service';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ContextTypeRouteResolverService } from './services/context-type-route-resolver.service';
import { YesNoDialogComponent } from './components/dialogs/yes-no-dialog/yes-no-dialog.component';
import { TextFieldComponent } from './components/forms/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { SelectFieldComponent } from './components/forms/select-field/select-field.component';
import { TextAreaFieldComponent } from './components/forms/text-area-field/text-area-field.component';
import { DateFieldComponent } from './components/forms/date-field/date-field.component';
import { CheckBoxFieldComponent } from './components/forms/check-box-field/check-box-field.component';
import { NumberFieldComponent } from './components/forms/number-field/number-field.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UtcDateTimePipe } from './pipes/utc-date-time.pipe';

@NgModule({
  declarations: [
    DragDropComponent,
    YesNoDialogComponent,
    TextFieldComponent,
    SelectFieldComponent,
    TextAreaFieldComponent,
    DateFieldComponent,
    CheckBoxFieldComponent,
    NumberFieldComponent,
    UtcDateTimePipe    
  ],
  providers: [
    AppHttpClientService,
    ContextTypeRouteResolverService,
    DatePipe     
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    DragDropComponent,
    YesNoDialogComponent,  
    TextFieldComponent,
    SelectFieldComponent,
    TextAreaFieldComponent,
    DateFieldComponent,
    CheckBoxFieldComponent,
    NumberFieldComponent,
    TextAreaFieldComponent,
    UtcDateTimePipe
  ]
})
export class AppCommonModule { }
