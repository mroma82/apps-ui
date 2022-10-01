import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { IMenuItem } from 'src/app/common/models/menu-item';
import { AppContextService } from 'src/app/app-context.service';
import { MenuItemService } from 'src/app/common/services/menu-item.service';
import { APP_VERSION } from 'src/app/app-version';
import { environment } from 'src/environments/environment';
import { InstanceContextService } from '../../../common/services/instance-context.service';
import { LeftMenuComponent } from '../left-menu/left-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // model
  model = {
    showMenu: false,
    appVersion: APP_VERSION,
    environmentDescription: environment.description
  };

  // observables
  licenseStatus$ = this.instanceContext.licenseStatus$;

  // new  
  constructor(
    private instanceContext: InstanceContextService
  ) {
  }

  // init
  ngOnInit() {
  }
}
