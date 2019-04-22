import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { ExampleListContextService } from '../../services/example-list-context.service';
import { ExampleCreateContextService } from '../../services/example-create-context.service';

@Component({
  selector: 'app-example-list-page',
  templateUrl: './example-list-page.component.html',
  styleUrls: ['./example-list-page.component.scss']  
})
export class ExampleListPageComponent implements OnInit {

  constructor(
    private appContext: AppContextService,
    private context: ExampleListContextService,
    private createContext: ExampleCreateContextService
  ) { 
    appContext.Layout.setTitle("Example App");    
  }

  // init
  ngOnInit() {

    // refresh data
    this.context.refreshData();
  }

  // open create dialog
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
