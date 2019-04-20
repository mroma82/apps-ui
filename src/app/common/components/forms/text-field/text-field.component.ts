import { Component, OnInit, Input, ViewChild, Optional, Inject, Output, EventEmitter } from '@angular/core';
import { NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextFieldComponent,
    multi: true,
  }]
})
export class TextFieldComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string = "";
  @Input() public readonly: boolean;
  @Input() public disabled: boolean;
  @Input() public name: string;  

  @ViewChild(NgModel) model: NgModel;

  public identifier = `text-field-${textFieldIdx++}`;

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }
}

let textFieldIdx = 0;