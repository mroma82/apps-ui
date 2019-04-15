import { Component, OnInit } from '@angular/core';
import { RecordLockContextService } from 'src/app/foundation/services/record-lock/record-lock-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';
import { ExampleViewEditContextService } from '../../services/example-view-edit-context.service';

@Component({
  selector: 'app-example-edit-page',
  templateUrl: './example-edit-page.component.html',
  styleUrls: ['./example-edit-page.component.scss'],
  providers: [
    RecordContextService, 
    RecordLockContextService,
    ExampleViewEditContextService
  ]  
})
export class ExampleEditPageComponent implements OnInit {

  // define model
  model = {
    id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appContext: AppContextService,
    private recordContext: RecordContextService,
    private recordLockContext: RecordLockContextService,
    private viewEditContext: ExampleViewEditContextService
  ) {   
    
  }

  ngOnInit() {
    
    // get the id
    this.model.id = this.activatedRoute.snapshot.paramMap.get('id');  
    this.appContext.Layout.setTitle("Example: " + this.model.id);

    // set record
    this.recordContext.setRecordContext(1, this.model.id);
    this.viewEditContext.setId(this.model.id);

    // init record locking
    this.recordLockContext.init();
  }

  // save
  save() {

    // update
    this.viewEditContext.update().subscribe();
  }

  // save close
  saveClose() {

    // update, if ok, go back to listing
    this.viewEditContext.update().subscribe(x => {
      if(x) {
        this.router.navigateByUrl('/app/example');
      }
    });
  }

  // delete
  delete() {

    // delete, if ok, go back to listing
    this.viewEditContext.delete().subscribe(x => {
      if(x) {
        this.router.navigateByUrl('/app/example');
      }
    });
  }
}
