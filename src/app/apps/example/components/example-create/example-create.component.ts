import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExampleCreateContextService } from '../../services/example-create-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-create',
  templateUrl: './example-create.component.html',
  styleUrls: ['./example-create.component.scss']
})
export class ExampleCreateComponent implements OnInit {
  
  // model
  model : any;

  // state
  state = {
    errorText: ""
  };

  // new
  constructor(
    private context: ExampleCreateContextService,
    private router: Router
  ) { }

  // init
  ngOnInit() {
    this.model = {};
  }

  // create
  create() {
    
    // clear error
    this.state.errorText = "";

    // create
    this.context.create(this.model).subscribe(x => {
      if(x.success) {
        this.context.closeDialog();
        this.router.navigateByUrl(`/app/example/edit/${x.id}`);
      } else {
        this.state.errorText = x.text;
      }
    })
  }
}
