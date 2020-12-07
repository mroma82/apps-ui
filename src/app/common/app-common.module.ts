import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppHttpClientService } from './services/app-http-client.service';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { EntityRouteResolverService } from './services/entity-route-resolver.service';
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
import { LookupDialogContainerComponent } from './lookups/containers/lookup-dialog-container/lookup-dialog-container.component';
import { CustomerLookupDialogComponent } from './lookups/customer-lookup-dialog/customer-lookup-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LookupFieldComponent } from './components/forms/lookup-field/lookup-field.component';
import { CardGroupComponent } from './components/layout/card-group/card-group.component';
import { IntegrationService } from './services/integration.service';
import { ListingControlsComponent } from './components/listing/listing-controls/listing-controls.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExcludeDeletedPipe } from './pipes/exclude-deleted.pipe';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { SimulateUserComponent } from './components/utils/simulate-user/simulate-user.component';
import { UserFullnamePipe } from './pipes/user-fullname.pipe';
import { MenuItemService } from './services/menu-item.service';
import { RouterModule } from '@angular/router';
import { LocalNavComponent } from './components/layout/local-nav/local-nav.component';
import { ToastMessageListComponent } from './components/toast/toast-message-list/toast-message-list.component';
import { UtcDateTimeSincePipe } from './pipes/utc-date-time-since';
import { TileComponent } from './components/layout/tile/tile.component';

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
    LookupFieldComponent,
    UtcDateTimePipe,
    UtcDateTimeSincePipe,
    LookupDialogContainerComponent,
    CustomerLookupDialogComponent,
    CardGroupComponent,
    ListingControlsComponent,
    ExcludeDeletedPipe,
    MessageDialogComponent,
    SimulateUserComponent,
    UserFullnamePipe,
    LocalNavComponent,
    ToastMessageListComponent,
    TileComponent    
  ],
  providers: [
    AppHttpClientService,
    EntityRouteResolverService,
    IntegrationService,
    DatePipe,
    MenuItemService    
  ],
  imports: [
    CommonModule,
    FormsModule,    
    NgxDatatableModule,
    NgbModule,
    RouterModule,
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
    LookupFieldComponent,    
    CustomerLookupDialogComponent,
    CardGroupComponent,
    ListingControlsComponent,    
    MessageDialogComponent,
    SimulateUserComponent,
    LocalNavComponent,
    ToastMessageListComponent,
    TileComponent,

    UtcDateTimePipe,
    UtcDateTimeSincePipe,
    ExcludeDeletedPipe,
    UserFullnamePipe 
  ]
})
export class AppCommonModule { }
