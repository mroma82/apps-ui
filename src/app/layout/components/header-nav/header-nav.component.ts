import { Component, OnInit } from '@angular/core';
import { LayoutContextService } from '../../services/layout-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  // observables
  app$ : Observable<string> = this.layoutContext.appTitle$;
  title$ : Observable<string> = this.layoutContext.pageTitle$;
  
  // new
  constructor(
    private layoutContext: LayoutContextService
  ) {     
  }

  ngOnInit() {
  }

}
