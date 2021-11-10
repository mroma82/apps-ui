import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-user-context-menu',
  templateUrl: './header-user-context-menu.component.html',
  styleUrls: ['./header-user-context-menu.component.scss']
})
export class HeaderUserContextMenuComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() user: any;
  @Input() instance: any;

  constructor() { }

  ngOnInit(): void {
  }

}
