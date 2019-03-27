import { Component, OnInit } from '@angular/core';
import { RecordLockContextService } from 'src/app/foundation/services/record-lock/record-lock-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';

@Component({
  selector: 'app-example-edit-page',
  templateUrl: './example-edit-page.component.html',
  styleUrls: ['./example-edit-page.component.scss'],
  providers: [RecordContextService, RecordLockContextService]  
})
export class ExampleEditPageComponent implements OnInit {

  // define model
  model = {
    id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private appContext: AppContextService,
    private recordContext: RecordContextService,
    private recordLockContext: RecordLockContextService
  ) {   
    
  }

  ngOnInit() {
    
    // get the id
    this.model.id = this.activatedRoute.snapshot.paramMap.get('id');  
    this.appContext.Layout.setTitle("Example: " + this.model.id);

    // set record
    this.recordContext.setRecordContext(1, this.model.id);

    // init record locking
    this.recordLockContext.init();
  }
}
