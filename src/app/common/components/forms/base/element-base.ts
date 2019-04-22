import { NgModel, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValidatorArray, AsyncValidatorArray, ValidationResult, message, validate } from './validation';
import { map } from 'rxjs/operators';

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
  
    constructor(
      private validators: ValidatorArray,
      private asyncValidators: AsyncValidatorArray,
    ) {
      super();
    }
  
    protected validate(): Observable<ValidationResult> {
      return validate
        (this.validators, this.asyncValidators)
        (this.model.control);
    }
  
    protected get invalid(): Observable<boolean> {
      return this.validate().pipe(map(v => Object.keys(v || {}).length > 0 && this.model.control.touched));
    }
  
    protected get failures(): Observable<Array<string>> {
      return this.validate().pipe(map(v => Object.keys(v).map(k => message(v, k))));
    }
  }
  