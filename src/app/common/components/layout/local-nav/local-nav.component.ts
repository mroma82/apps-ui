import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INavigationItem } from 'src/app/common/models/navigation-item';

@Component({
  selector: 'app-local-nav',
  templateUrl: './local-nav.component.html',
  styleUrls: ['./local-nav.component.scss']
})
export class LocalNavComponent implements OnInit {
  @Input() items : INavigationItem[];
  public isMenuCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  // function to check if showing
  isShowing(item: INavigationItem) : Observable<boolean> {

    // check if show function
    if(!item.hasAccess$) {
      return of(true);
    }

    // check if has access
    return item.hasAccess$;
  }

}
