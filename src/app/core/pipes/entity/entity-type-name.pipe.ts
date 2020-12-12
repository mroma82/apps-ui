import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { EntityProviderService } from '../../services/entity/entity-provider.service';

@Pipe({
  name: 'entityTypeName'
})
export class EntityTypeNamePipe implements PipeTransform {

  // cache
  readonly cache = [];

  // new
  constructor (
    private entityProvider : EntityProviderService
  ){

  }

  // transform
  transform(value: string): Observable<string> {

    // check cache
    if(!this.cache[value]) {
      this.cache[value] = this.entityProvider.getEntityName(value).pipe(shareReplay());
    }

    // return
    return this.cache[value];
  }
}
