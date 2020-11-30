import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private appContext: AppContextService
  ) { 
    appContext.Layout.setTitle(null);
    appContext.Layout.setApp(null);
  }

  ngOnInit() {
  }

}
