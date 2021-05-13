import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { FORM_COLUMN_PROVIDER, IFormColumnProvider } from 'src/app/common/services/form-column-provider.service';
import { FORM_STATE_PROVIDER, IFormStateProvider } from '../../../services/form-state-provider.service';

@Component({
  selector: 'app-check-box-field',
  templateUrl: './check-box-field.component.html',
  styleUrls: ['./check-box-field.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckBoxFieldComponent,
      multi: true,
  }]

})
export class CheckBoxFieldComponent extends ElementBase<boolean> implements OnInit {
  @Input() public label: string;    
  @Input() public name: string;
  @Input() public disabled?: boolean;
  public required? : boolean = false;

  @ViewChild(NgModel, { static: true }) model: NgModel;

  public identifier = `checkbox-field-${checkBoxIdx++}`;

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

let checkBoxIdx = 0;

