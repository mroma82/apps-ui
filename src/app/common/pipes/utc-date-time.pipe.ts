import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'utcDateTime'
})
export class UtcDateTimePipe implements PipeTransform {

  // inject date pipe
  constructor(private datePipe: DatePipe) { }

  // transform
  transform(value: any, format: string): string {

    // check if a value
    if (value && value !== "1900-01-01T00:00:00") {
      return this.datePipe.transform(new Date(value + 'Z'), format);
    }
    return '';
  }
}
