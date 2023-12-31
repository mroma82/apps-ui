import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() url : string;
  @Input() title : string;
  @Input() icon : string;
  @Input() description : string;
  

  constructor() { }

  ngOnInit() {
  }

}
