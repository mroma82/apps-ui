import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SetupPasswordContextService } from '../../services/setup-password-context.service';

@Component({
  selector: 'app-setup-password-page',
  templateUrl: './setup-password-page.component.html',
  styleUrls: ['./setup-password-page.component.scss'],
  providers: [SetupPasswordContextService]
})
export class SetupPasswordPageComponent implements OnInit {

  // state
  validateResult$ = this.context.validateResult$;
    
  // new
  constructor(
    private route: ActivatedRoute,
    private context: SetupPasswordContextService
  ) { }

  // init
  ngOnInit() {

    // validate from link
    this.route.queryParams.pipe(take(1)).subscribe(({u, s, i}) => {      
      this.context.validate(u, s, i);
    });
  }
}
