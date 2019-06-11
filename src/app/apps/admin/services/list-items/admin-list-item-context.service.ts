import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ListItemService } from 'src/app/common/services/list-item.service';
import { AdminListItemApiService } from './admin-list-item-api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminListItemContextService {

  // list observables
  listItemTypeList$ = new BehaviorSubject<any>([]);

  // edit observables
  listItemTypeSelected$ = new BehaviorSubject<string>("");
  listItemsList$ = new BehaviorSubject<any>([]);

  // new
  constructor(
    private api: AdminListItemApiService
  ) { 
    
  }

  // refresh list
  refreshTypes() {
    this.api.getTypes().subscribe(x => this.listItemTypeList$.next(x));
  }

  // set type
  setItemTypeSelected(typeId: string) {
    this.listItemTypeSelected$.next(typeId);
    this.refreshItems(typeId);
  }

  // refresh items
  refreshItems(typeId: string) {
    this.listItemsList$.next([]);
    this.api.getItemsByType(typeId).subscribe(x => this.listItemsList$.next(x));
  }

  // save
  save() : Observable<any> {
    return this.api.updateItems(this.listItemTypeSelected$.value, this.listItemsList$.value);
  }

  // add type
  createType(model) : Observable<string> {
    return this.api.createType(model).pipe(tap(x => this.refreshTypes()));
  }

  // update type
  updateType(model) : Observable<boolean> {
    return this.api.updateType(model).pipe(tap(x => this.refreshTypes()));
  }
}
