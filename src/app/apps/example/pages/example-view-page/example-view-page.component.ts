import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { ExampleViewEditContextService } from '../../services/example-view-edit-context.service';

@Component({
  selector: 'app-example-view-page',
  templateUrl: './example-view-page.component.html',
  styleUrls: ['./example-view-page.component.scss'],
  providers: [
    RecordContextService,
    ExampleViewEditContextService
  ]
})
export class ExampleViewPageComponent implements OnInit {

  // define model
  model = {
    id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,    
    private recordContext: RecordContextService,
    private viewEditContext: ExampleViewEditContextService
  ) {   
    
  }

  // init
  ngOnInit() {
    
    // get the id
    this.model.id = this.activatedRoute.snapshot.paramMap.get('id');      

    // set record
    this.recordContext.setRecordContext(1, this.model.id);
    this.viewEditContext.setId(this.model.id);
  }

  // edit
  edit() {
    this.router.navigateByUrl(`/app/example/edit/${this.model.id}`)
  }
}
