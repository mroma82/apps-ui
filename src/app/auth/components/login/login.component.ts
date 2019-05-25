import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserContextService } from 'src/app/common/services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("usernameField") usernameField : ElementRef;

  model = {
    username: "",
    password: ""
  };

  state = {
    hasError: false,
    errorText: ""
  };

  // new
  constructor(
    private userContext: UserContextService,
    private router: Router
  ) { }

  // init
  ngOnInit() {
    this.usernameField.nativeElement.focus();
  }

  // login
  login() {
    
    // clear error
    this.state = {...this.state, ...{
      hasError: false,
      errorText:  ""
    }};

    this.userContext.login(this.model).subscribe(x => {
      if(x.success) {
        this.router.navigateByUrl(x.nextUrl);
      } else {
        this.state = {...this.state, ...{
          hasError: true,
          errorText:  x.text
        }}
      }
    })
  }

}
