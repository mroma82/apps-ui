import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeDeleted',
  pure: false
})
export class ExcludeDeletedPipe implements PipeTransform {

  transform(items: any[]): any {

    // check if no items
    if (!items) {
      return items;
    }

    // filter out deleted items
    return items.filter(item => item.isDeleted == false);
  }
}
