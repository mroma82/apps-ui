import { Component, OnInit, Input, ViewChild, Optional, Inject, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'app-lookup-field',
  templateUrl: './lookup-field.component.html',
  styleUrls: ['./lookup-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LookupFieldComponent,
    multi: true,
  }]
})
export class LookupFieldComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string = "";
  @Input() public readonly: boolean;
  @Input() public disabled: boolean;
  @Input() public name: string;  

  @Output() public onLookup = new EventEmitter();  

  @ViewChild(NgModel) model: NgModel;

  public identifier = `lookup-field-${lookupFieldIdx++}`;

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }

  // lookup
  lookup() {
    this.onLookup.emit();
  }
}

let lookupFieldIdx = 0;
