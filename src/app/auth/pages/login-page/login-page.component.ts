import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InstanceContextService } from 'src/app/common/services/instance-context.service';
import { LocalizationService } from '../../../common/services/localization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // state
  showInstance: boolean = this.instanceContext.instanceId === undefined;
  cultures$: Observable<string[]> = this.localization.cultures$;

  // new
  constructor(
    private instanceContext: InstanceContextService,
    private localization: LocalizationService
  ) { }

  // init
  ngOnInit() {
  }

  // set culture
  setCulture(culture: string) {
    this.localization.setCulture(culture);
  }

}
