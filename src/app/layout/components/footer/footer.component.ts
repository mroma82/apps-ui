import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { InstanceContextService } from 'src/app/common/services/instance-context.service';
import { IInstance } from '../../../common/models/instance';
import { IUserProfile } from '../../../common/models/user-profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // state 
  user$: Observable<IUserProfile>;
  isAuthenticated$: Observable<boolean>;
  instance$: Observable<IInstance>;

  constructor(
    private appContext: AppContextService,
    private instanceContext: InstanceContextService,
    private router: Router
  ) {
    this.user$ = appContext.User.profile$;
    this.isAuthenticated$ = appContext.User.isAuthenticated$;
    this.instance$ = instanceContext.instance$;
  }

  // init
  ngOnInit() {

  }
}
