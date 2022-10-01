import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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

  constructor() { }

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
}
