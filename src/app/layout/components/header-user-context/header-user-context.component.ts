import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../../../app-context.service';
import { IInstance } from '../../../common/models/instance';
import { IUserProfile } from '../../../common/models/user-profile';
import { InstanceContextService } from '../../../common/services/instance-context.service';

@Component({
  selector: 'app-header-user-context',
  templateUrl: './header-user-context.component.html',
  styleUrls: ['./header-user-context.component.scss']
})
export class HeaderUserContextComponent implements OnInit {

  // state 
  user$: Observable<IUserProfile> = this.appContext.User.profile$;
  isAuthenticated$: Observable<boolean> = this.appContext.User.isAuthenticated$;
  instance$: Observable<IInstance> = this.instanceContext.instance$;

  // menu
  menuOpen: boolean = false;

  // new
  constructor(
    private appContext: AppContextService,
    private instanceContext: InstanceContextService
  ) {

  }

  // init
  ngOnInit(): void {
  }

  // toggle menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // hide menu
  hideMenu() {
    this.menuOpen = false;
  }
}
