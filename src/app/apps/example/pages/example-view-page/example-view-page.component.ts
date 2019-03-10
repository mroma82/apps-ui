import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-example-view-page',
  templateUrl: './example-view-page.component.html',
  styleUrls: ['./example-view-page.component.scss']
})
export class ExampleViewPageComponent implements OnInit {

  // define model
  model = {
    id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private appContext: AppContextService
  ) {   
    
  }

  ngOnInit() {
    
    // get the id
    this.model.id = this.activatedRoute.snapshot.paramMap.get('id');  
    this.appContext.Layout.setTitle("Example: " + this.model.id);
  }

}
