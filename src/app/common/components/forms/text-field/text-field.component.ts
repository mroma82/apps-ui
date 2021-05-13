import { Component, OnInit, Input, ViewChild, Optional, Inject, Output, EventEmitter } from '@angular/core';
import { NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORM_COLUMN_PROVIDER, IFormColumnProvider } from 'src/app/common/services/form-column-provider.service';
import { FORM_STATE_PROVIDER, IFormStateProvider } from '../../../services/form-state-provider.service';
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
export class TextFieldComponent extends ElementBase<string> implements OnInit {    
  @Input() public label: string;
  @Input() public required?: boolean;
  @Input() public name: string;  
  @Input() public placeholder: string = "";
  @Input() public readonly: boolean;
  @Input() public disabled?: boolean;
    
  @ViewChild(NgModel, { static: true }) model: NgModel;

  public identifier = `text-field-${textFieldIdx++}`;  

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Optional() @Inject(FORM_COLUMN_PROVIDER) formColumnProvider: IFormColumnProvider,
    @Optional() @Inject(FORM_STATE_PROVIDER) formStateProvider: IFormStateProvider
  ) {
    super(validators, asyncValidators, formColumnProvider, formStateProvider);    
  }

  // init
  ngOnInit() {

    // init observables
    this.initObservables();         
  }  
}

let textFieldIdx = 0;