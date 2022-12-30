import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizationService } from '../../../common/services/localization.service';

@Component({
  selector: 'app-header-user-context-menu',
  templateUrl: './header-user-context-menu.component.html',
  styleUrls: ['./header-user-context-menu.component.scss']
})
export class HeaderUserContextMenuComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() user: any;
  @Input() instance: any;
  @Output() onHideMenu = new EventEmitter();

  @ViewChild("container") container: ElementRef;

  // services
  cultures$: Observable<string[]> = this.localization.cultures$;

  // new
  constructor(
    private localization: LocalizationService
  ) { }

  ngOnInit(): void {
  }

  // handle when container is clicked
  onContainerClick(e: Event) {

    // make sure it's onlyt he container
    if (e.target === this.container.nativeElement)
      this.hideMenu();
  }

  // hide menu
  hideMenu() {
    this.onHideMenu.emit();
  }

  // set culture
  setCulture(culture: string) {
    this.localization.setCulture(culture);
    this.hideMenu();
  }
}
