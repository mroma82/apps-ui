import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  model = {
    showMenu: false
  };

  constructor() { }

  ngOnInit() {
  }

  // toggle the menu
  toggleMenu() {
    this.model.showMenu = !this.model.showMenu;
  } 

  // hide menu
  hideMenu() {
    this.model.showMenu = false;
  }

}
