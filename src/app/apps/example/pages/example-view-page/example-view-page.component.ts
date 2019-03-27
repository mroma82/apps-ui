import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';

@Component({
  selector: 'app-example-view-page',
  templateUrl: './example-view-page.component.html',
  styleUrls: ['./example-view-page.component.scss'],
  providers: [RecordContextService]
})
export class ExampleViewPageComponent implements OnInit {

  // define model
  model = {
    id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private appContext: AppContextService,
    private recordContext: RecordContextService
  ) {   
    
  }

  ngOnInit() {
    
    // get the id
    this.model.id = this.activatedRoute.snapshot.paramMap.get('id');  
    this.appContext.Layout.setTitle("Example: " + this.model.id);

    // set record
    this.recordContext.setRecordContext(1, this.model.id);
  }

}
