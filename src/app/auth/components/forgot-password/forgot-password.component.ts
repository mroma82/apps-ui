import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from 'src/app/common/services/user-context.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild("usernameField", { static: true }) usernameField : ElementRef;
  
  // model
  model = {
    username: ""    
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
  reset() {
    
    // clear error
    this.state = {...this.state, ...{
      hasError: false,
      errorText:  ""
    }};

    // set up password
    this.userContext.sendPasswordSetup(this.model.username).subscribe(x => {
      if(x) {  
        this.router.navigateByUrl("/forgot-password-success");
      } else {
        this.state = {...this.state, ...{
          hasError: true,
          errorText:  x.text
        }}
      }
    })
  }

}
