import { Component, OnInit, Input, ViewChild, Optional, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NG_VALIDATORS, NG_ASYNC_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { FORM_COLUMN_PROVIDER, IFormColumnProvider } from 'src/app/common/services/form-column-provider.service';
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
export class DateFieldComponent extends ElementBase<string> implements OnInit {
  @Input() public label: string;
  @Input() public placeholder: string = "";
  @Input() public readonly: boolean;
  @Input() public disabled: boolean;
  @Input() public name: string;  
  @Input() public required: boolean;

  @ViewChild(NgModel, { static: true }) model: NgModel;  
  
  public identifier = `date-field-${dateFieldIdx++}`;

  // define local date field for value
  dateValue: Date;

  // new
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Optional() @Inject(FORM_COLUMN_PROVIDER) formColumnProvider: IFormColumnProvider
  ) {
    super(validators, asyncValidators, formColumnProvider);
  }

  // init
  ngOnInit() {

    // on value change
    this.model.valueChanges.subscribe(x => this.onValueChange());          

    // init observables
    this.initObservables();    
  }

  // on date change
  onDateChange() {    
    
    // set model correctly
    if(this.dateValue === null)
      this.value = "1900-01-01";    
    else
      this.value = this.dateValue.toLocaleDateString(); 
  }

  // on value change
  onValueChange() {

    // get the date object
    const dt = new Date(this.value);
      
    // check if an empty date value and date is actully changes
    if(this.dateValue === null || this.dateValue == undefined || (dt != null && this.dateValue.toLocaleDateString() != dt.toLocaleDateString())) {
        
      // exclude blank dates
      if(dt.toLocaleDateString() !== "1/1/1900") {
        this.dateValue = new Date(this.value);
      }        
    }    
  }

}

let dateFieldIdx = 0;
