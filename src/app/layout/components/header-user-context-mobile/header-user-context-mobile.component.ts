import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../app-context.service';
import { IInstance } from '../../../common/models/instance';
import { IUserProfile } from '../../../common/models/user-profile';
import { InstanceContextService } from '../../../common/services/instance-context.service';
import { LocalizationService } from '../../../common/services/localization.service';

@Component({
  selector: 'app-header-user-context-mobile',
  templateUrl: './header-user-context-mobile.component.html',
  styleUrls: ['./header-user-context-mobile.component.scss']
})
export class HeaderUserContextMobileComponent implements OnInit {

  // state 
  user$: Observable<IUserProfile> = this.appContext.User.profile$;
  isAuthenticated$: Observable<boolean> = this.appContext.User.isAuthenticated$;
  instance$: Observable<IInstance> = this.instanceContext.instance$;
  cultures$: Observable<string[]> = this.localization.cultures$;

  // new
  constructor(
    private appContext: AppContextService,
    private instanceContext: InstanceContextService,
    private localization: LocalizationService,
  ) {
  }

  // init
  ngOnInit(): void {
  }

  // set culture
  setCulture(culture: string) {
    this.appContext.User.setCulture(culture);
  }
}
