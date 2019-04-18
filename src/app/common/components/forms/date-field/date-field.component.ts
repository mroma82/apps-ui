import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateFieldComponent,
    multi: true,
  }]
})
export class DateFieldComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public readonly: boolean;
  @Input() public disabled: boolean;
  @Input() public name: string;  

  @ViewChild(NgModel) model: NgModel;

  public identifier = `date-field-${dateFieldIdx++}`;

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }
}

let dateFieldIdx = 0;
