import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserContextService } from 'src/app/common/services/user-context.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InstanceContextService } from 'src/app/common/services/instance-context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("instanceField", { static: true }) instanceField : ElementRef;
  @ViewChild("usernameField", { static: true }) usernameField : ElementRef;

  // state
  showForgotPassword$ = of(true);
  showInstance : boolean = this.instanceContext.instanceId === undefined;
  instanceId : string = this.instanceContext.instanceId;

  // model
  model = {
    instanceNumber: "",
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
    private instanceContext: InstanceContextService,
    private router: Router
  ) { }

  // init
  ngOnInit() {    
    if(this.showInstance) 
      this.instanceField.nativeElement.focus();
    else
      this.usernameField.nativeElement.focus();
  }

  // login
  login() {
    
    // clear error
    this.state = {...this.state, ...{
      hasError: false,
      errorText:  ""
    }};
    
    // login
    this.userContext.login(this.model).subscribe(x => {
      if(x.success) {
        this.router.navigateByUrl(x.nextUrl);
      } else {
        this.state = {...this.state, ...{
          hasError: true,
          errorText:  x.text
        }}
      }
    });
  }

}
