import { Component, OnInit } from '@angular/core';
import { LayoutContextService } from 'src/app/layout/services/layout-context.service';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss']
})
export class ExampleContainerComponent implements OnInit {

  // new
  constructor(
    layoutContext : LayoutContextService
  ) { 
    // set app
    layoutContext.setApp("Example Application");
  }

  ngOnInit() {
  }

}
