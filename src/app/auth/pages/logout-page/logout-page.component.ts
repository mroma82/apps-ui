import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {

  // new
  constructor(
    private router: Router,
    private appContext: AppContextService

  ) { }

  ngOnInit() {
    this.appContext.User.logout();
    this.router.navigateByUrl("/login");
  }

}
