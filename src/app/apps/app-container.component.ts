import { Component, OnInit } from '@angular/core';
import { NotificationContextService } from '../foundation/services/notification/notification-context.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  providers: [
    NotificationContextService
  ]
})
export class AppContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
