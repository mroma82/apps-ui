import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-enter-submit-form',
  templateUrl: './enter-submit-form.component.html',
  styleUrls: ['./enter-submit-form.component.sass']
})
export class EnterSubmitFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();

  // new
  constructor() { }

  // init
  ngOnInit(): void {
  }

  // submit
  submit() {
    this.onSubmit.emit();
  }

}
