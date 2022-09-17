import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  yearList$: Observable<{ id: string, text: string }[]>;
  monthList$: Observable<{ id: string, text: string }[]>;

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

    // years
    var years: number[] = [];
    for (let i = -5; i <= 1; i++) {
      years.push(new Date().getFullYear() + i);
    }
    this.yearList$ = of(years.map(x => {
      return {
        id: "" + x,
        text: "" + x
      }
    }));

    // months
    this.monthList$ = of([
      { id: "1", text: "January" },
      { id: "2", text: "February" },
      { id: "3", text: "March" },
      { id: "4", text: "April" },
      { id: "5", text: "May" },
      { id: "6", text: "June" },
      { id: "7", text: "July" },
      { id: "8", text: "August" },
      { id: "9", text: "September" },
      { id: "10", text: "October" },
      { id: "11", text: "November" },
      { id: "12", text: "December" },
    ]);
  }
}
