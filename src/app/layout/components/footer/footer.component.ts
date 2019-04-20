import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // user 
  user$: Observable<any>;
  isAuthenticated$ : Observable<boolean>;

  constructor(
    private appContext: AppContextService,
    private router: Router
  ) 
  { 
    this.user$ = appContext.User.profile$;
    this.isAuthenticated$ = appContext.User.isAuthenticated$;
  }

  ngOnInit() {

  }

  // log out
  logOut() {
    this.appContext.User.logout();
    this.router.navigateByUrl("/login");
  }
}
