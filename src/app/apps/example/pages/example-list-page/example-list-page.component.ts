import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-example-list-page',
  templateUrl: './example-list-page.component.html',
  styleUrls: ['./example-list-page.component.scss']
})
export class ExampleListPageComponent implements OnInit {

  constructor(
    private appContext: AppContextService
  ) { 
    appContext.Layout.setTitle("Example App");
  }

  ngOnInit() {
  }

}
