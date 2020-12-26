import { Component, OnInit } from '@angular/core';
import { InstanceContextService } from 'src/app/common/services/instance-context.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // state
  showInstance : boolean = this.instanceContext.instanceId === undefined;
  
  // new
  constructor(
    private instanceContext : InstanceContextService
  ) { }

  // init
  ngOnInit() {
  }

}
