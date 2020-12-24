import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupPasswordContextService } from '../../services/setup-password-context.service';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.scss']
})
export class SetupPasswordComponent implements OnInit {

  // state
  state = {
    hasError: false,
    errorText: ""
  };
  
  // model
  model = {
    password: "",
    passwordConfirm: ""
  };

  // new
  constructor(
    private router: Router,
    private context: SetupPasswordContextService
  ) { }

  // init
  ngOnInit() {
  }

  // update
  update() {

    // clear
    this.state.hasError = false;
    this.state.errorText = "";
  
    // update
    this.context.update(this.model).subscribe(x => {

      // check ok
      if(x.success) {
        this.router.navigateByUrl("/setup-password-success");
      } else {
        this.state.hasError = true;
        this.state.errorText = x.errorText;
      }
    });
  }
}
