import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ISelectListItem } from 'src/app/common/models/select-list-item';
import { EntityApiService } from './entity/entity-api.service';

@Injectable()
export class SelectListService {

  // new
  constructor(
    private entityApi: EntityApiService
  ) {

  }

  // get for entity
  getEntityList(entityTypeId: string, textField: string) : Observable<ISelectListItem<string>[]> {
    return this.entityApi.list(entityTypeId, {
      page: 1,
      pageSize: 999
    }).pipe(map(x => x.items.map(i => 
      { 
        return {
          value: i.id,
          text: i[textField]
        };
      })
    )).pipe(shareReplay(1));
  }
}
