import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss']
})
export class CardGroupComponent implements OnInit {
  @Input() title : string;
  
  constructor() { }

  ngOnInit() {
  }

}
