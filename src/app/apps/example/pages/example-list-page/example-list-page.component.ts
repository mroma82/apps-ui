import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/app-context.service';
import { ExampleCreateContextService } from '../../services/example-create-context.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example-list-page',
  templateUrl: './example-list-page.component.html',
  styleUrls: ['./example-list-page.component.scss']  
})
export class ExampleListPageComponent implements OnInit {

  constructor(
    private appContext: AppContextService,    
    private createContext: ExampleCreateContextService,
    private route: ActivatedRoute
  ) {     
  }

  // init
  ngOnInit() {

    // check my tasks
    /*if(this.route.snapshot.data.isMyTasks) {
      this.context.setMyTasks(true);
      this.appContext.Layout.setTitle("Example App - My Tasks");         
    } else {
      this.context.setMyTasks(false);
      this.appContext.Layout.setTitle("Example App");         
    }*/

    // refresh data
    //this.context.refreshData();    
  }

  // open create dialog
  openCreateDialog() {
    this.createContext.openDialog();
  }
}
