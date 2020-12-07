import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { min } from 'rxjs/operators';

@Pipe({
  name: 'utcDateTimeSince'
})
export class UtcDateTimeSincePipe implements PipeTransform {

  // inject date pipe
  constructor(private datePipe: DatePipe) {}
  
  // transform
  transform(value: any): string {    
    if(value) {

      // get the date as utc
      var utcDate = new Date(value + 'Z');
      var utcNow = new Date();

      // get the difference in minutes
      var minutes = (utcNow.getTime() - utcDate.getTime())/1000/60;

      // check if minutes
      if(minutes < 60) {
        return this.getText(minutes, "minutes");        
      }

      // check if hours
      var hours = minutes / 60;
      if(hours < 24) {
        return this.getText(hours, "hour");        
      }

      // else, days
      var days = hours / 24;
      return this.getText(days, "day");      
    }
    return '';
  }

  // get the text
  getText(num: number, unit: string) {
    var wholeNum = Math.round(num);
    return `${wholeNum} ${unit}${wholeNum == 1 ? '' : 's'} ago`;
  }
}
