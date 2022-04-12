import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/auth.service';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { GlobalListsService } from '../../../core/services/global-lists.service';
import { PmService } from './pm.service';


@Injectable()
export class PmListsService {

  // observables
  userList$: Observable<any>;
  itemTypeList$: Observable<any>;
  locationList$: Observable<any>;

  // new
  constructor(
    globalLists: GlobalListsService,
    service: PmService,
    listItems: ListItemService
  ) {

    // set lists
    this.userList$ = globalLists.getUsers();

    // get params    
    const params$ = service.getParameters();

    // get item type from params
    this.itemTypeList$ = params$.pipe(mergeMap((x: any) =>
      listItems.getItemsByType(x.itemTypeListTypeId).pipe(take(1))
    ));

    // get location from params    
    this.locationList$ = params$.pipe(mergeMap((x: any) =>
      listItems.getItemsByType(x.locationListTypeId).pipe(take(1))
    ));
  }
}
