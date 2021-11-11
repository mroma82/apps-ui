import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { INavigationItem } from 'src/app/common/models/navigation-item';

@Component({
  selector: 'app-local-nav',
  templateUrl: './local-nav.component.html',
  styleUrls: ['./local-nav.component.scss']
})
export class LocalNavComponent implements OnInit {
  @Input() items: INavigationItem[];
  public isMenuCollapsed = true;

  // new
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // function to check if showing
  isShowing(item: INavigationItem): Observable<boolean> {

    // check if show function
    if (!item.hasAccess$) {
      return of(true);
    }

    // check if has access
    return item.hasAccess$;
  }

  isActive(item: INavigationItem): boolean {

    // check if disable
    if (item.disableActivePath)
      return false;

    // get the url
    const url = this.router.url;

    // check exact
    if (item.activePathIsExact)
      return url === item.url;

    // else, check starts with
    return url.startsWith(item.url);
  }

}
