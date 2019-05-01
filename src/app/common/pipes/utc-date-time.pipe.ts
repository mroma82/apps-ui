import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'utcDateTime'
})
export class UtcDateTimePipe implements PipeTransform {

  // inject date pipe
  constructor(private datePipe: DatePipe) {}
  
  // transform
  transform(value: any, format: string): string {    
    if(value) {
      return this.datePipe.transform(new Date(value + 'Z'), format);
    }
    return '';
  }
}
