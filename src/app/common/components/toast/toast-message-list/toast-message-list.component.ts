import { Component, OnInit } from '@angular/core';
import { ToastMessageContextService } from 'src/app/common/services/toast-message-context.service';

@Component({
  selector: 'app-toast-message-list',
  templateUrl: './toast-message-list.component.html',
  styleUrls: ['./toast-message-list.component.scss']
})
export class ToastMessageListComponent implements OnInit {

  messages = this.toastMessageContext.messages;

  constructor(
    private toastMessageContext : ToastMessageContextService
  ) { }

  ngOnInit() {
  }

  // dismiss
  dismiss(item: any) {
    this.toastMessageContext.dismiss(item);
  }
}
