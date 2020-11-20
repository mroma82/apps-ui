import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/app-context.service';
import { RecordContextService } from 'src/app/common/services/record-context.service';
import { ExampleViewEditContextService } from '../../services/example-view-edit-context.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { DialogResultEnum } from 'src/app/common/types/dialogs/dialog-result.enum';
import { EntityViewEditContextService } from 'src/app/common/services/entity/view-edit/entity-view-edit-context.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example-view-edit-page',
  templateUrl: './example-view-edit-page.component.html',
  styleUrls: ['./example-view-edit-page.component.scss'],
  providers: [
    RecordContextService,
    EntityViewEditContextService,
    ExampleViewEditContextService
  ]
})
export class ExampleViewEditPageComponent implements OnInit {

  // define model
  model = {
    id: ""    
  };
  

  constructor(    
    private router: Router,        
  ) {   
    
  }

  ngOnInit() {

  }
  
  // copy
  copy() {
    
    /*// copy, then check if ok
    this.viewEditContext.copy(false).subscribe(result => {
      if(result.success) {
        this.router.navigateByUrl(`/app/example/edit/${result.id}`)
      }          
    });      */
  }
}
