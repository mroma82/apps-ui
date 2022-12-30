import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../common/services/localization.service';
import { TaskContextService } from '../foundation/services/task/task-context.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  providers: [
    TaskContextService
  ]
})
export class AppContainerComponent implements OnInit {

  ngOnInit() {
  }

}
