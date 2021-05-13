import { NgModel, ControlValueAccessor } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ValidatorArray, AsyncValidatorArray, ValidationResult, message, validate } from './validation';
import { map } from 'rxjs/operators';
import { IFormColumnProvider } from 'src/app/common/services/form-column-provider.service';
import { Input } from '@angular/core';
import { IFormStateProvider } from '../../../services/form-state-provider.service';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  private changed = Array<(value: T) => void>()
  private touched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    this.touched.forEach(f => f());
  }

  writeValue(value: T) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;

  // inputs
  public abstract label: string;
  public abstract required?: boolean;
  public abstract name: string;  
  public abstract disabled?: boolean;

  // observables
  label$: Observable<string>;
  required$: Observable<boolean>;
  disabled$: Observable<boolean>;

  // new
  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    private formColumnProvider: IFormColumnProvider,
    private formStateProvider: IFormStateProvider
  ) {
    super();
  }

  protected validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  get invalid(): Observable<boolean> {
    return this.validate().pipe(map(v => Object.keys(v || {}).length > 0 && this.model.control.touched));
  }

  get failures(): Observable<Array<string>> {
    return this.validate().pipe(map(v => Object.keys(v).map(k => message(v, k))));
  }

  // init observables
  protected initObservables() {

    // set label
    if(this.formColumnProvider && !this.label) {
      this.label$ = this.formColumnProvider.getColumn(this.name).pipe(map(x => x?.label));
    } else {
      this.label$ = of(this.label);
    }

    // set required
    if(this.formColumnProvider && this.required == null) {
      this.required$ = this.formColumnProvider.getColumn(this.name).pipe(map(x => x?.isRequired));      
    } else {
      this.required$ = of(this.required ? true : false);
    }

    // set disabled
    if(this.formStateProvider && this.disabled == null) {
      this.disabled$ = this.formStateProvider.getState().pipe(map(x => x.mode != 'edit'));
    } else {
      this.disabled$ = of(this.disabled ? true : false);
    }
  }
}
