import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextAreaFieldComponent,
    multi: true,
  }]
})
export class TextAreaFieldComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string = "";
  @Input() public readonly: boolean;
  @Input() public disabled: boolean;
  @Input() public name: string;  
  @Input() public rows: number = 1;
  @Input() public required: boolean;
  
  @ViewChild(NgModel, { static: true }) model: NgModel;

  public identifier = `text-field-${textAreaFieldIdx++}`;

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }
}

let textAreaFieldIdx = 0;
