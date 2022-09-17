import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PmAgendaFilterModel } from '../../models/agenda/pm-agenda-filter-model';
import { PmAgendaApiService } from './pm-agenda-api.service';

@Injectable()
export class PmAgendaContextService implements OnDestroy {

  // filter
  private _filterStore$ = new BehaviorSubject<PmAgendaFilterModel>(null);
  public filter$ = this._filterStore$.asObservable();

  // items
  private _itemsStore$ = new BehaviorSubject<any[]>([]);
  public items$ = this._itemsStore$.asObservable();

  // subscriptions
  subs = new Subscription();

  // new
  constructor(
    private agendaApi: PmAgendaApiService
  ) {

    // date now
    const now = new Date();

    // init filter
    const initFilter: PmAgendaFilterModel = {
      locationId: "",
      itemTypeId: "",
      endDate: now.toLocaleDateString()
    };
    this._filterStore$.next(initFilter);

    // on filter change
    const onFilterChange = this._filterStore$.subscribe(x => this.refreshItems());
    this.subs.add(onFilterChange);
  }

  // cleanup
  ngOnDestroy(): void {
    if (this.subs)
      this.subs.unsubscribe();
  }

  // update filter
  updateFilter(filter: PmAgendaFilterModel) {
    console.log("updateFilter");
    // get the new filter
    const newFilter = {
      ...this._filterStore$.value,
      ...filter
    };

    // push
    this._filterStore$.next(newFilter);
  }

  // refresh items
  refreshItems() {
    console.log("refreshAgenda");

    // get items
    this.agendaApi.getItems(this._filterStore$.value).subscribe(x => {

      // add extras
      x.items.forEach(i => {
        if (i.events)
          i.events.forEach(ev => this.setEventExtras(ev));
      });

      // push to store
      this._itemsStore$.next(x.items);
    });
  }

  // set extra event fields
  setEventExtras(event: { eventDateTime: string, eventText?: string, isOverdue?: boolean }): void {

    // null safe
    if (!event || !event.eventDateTime) {
      return;
    }

    // helpers
    const eventDate = new Date(event.eventDateTime);
    const today = new Date();

    // set extras
    event.eventText = this.getEventText(eventDate, today);
    event.isOverdue = this.checkEventOverdue(eventDate, today);
  }

  // get event text
  getEventText(eventDate: Date, today: Date): string {

    // start with month/day
    let txt = `${eventDate.getMonth() + 1}/${eventDate.getDate()}`;

    // check if year needed
    if (eventDate.getFullYear() != new Date().getFullYear()) {
      txt += `/${eventDate.getFullYear()}`;
    }

    return txt;
  }

  // chck event overdue
  checkEventOverdue(eventDate: Date, today: Date): boolean {

    // year
    if (eventDate.getFullYear() < today.getFullYear())
      return true;
    else if (eventDate.getFullYear() === today.getFullYear()) {

      // month
      if (eventDate.getMonth() < today.getMonth())
        return true;
      else if (eventDate.getMonth() === today.getMonth()) {

        // day
        if (eventDate.getDate() < today.getDate())
          return true;
      }
    }

    // all else, no
    return false;
  }

}
