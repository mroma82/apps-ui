import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // user 
  user$: Observable<any>;

  constructor(
    private appContext: AppContextService
  ) 
  { 
    this.user$ = appContext.User.profile$;
  }

  ngOnInit() {

  }

}
