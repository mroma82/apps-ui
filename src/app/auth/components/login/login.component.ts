import { Component, OnInit } from '@angular/core';
import { UserContextService } from 'src/app/common/services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
        console.log("good-" + x.nextUrl);
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
