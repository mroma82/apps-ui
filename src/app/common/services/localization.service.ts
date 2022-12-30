import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, shareReplay } from 'rxjs/operators';
import { AppHttpClientService } from './app-http-client.service';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  // store
  private localizationStore = {};

  // define ready state
  private _ready$ = new BehaviorSubject<boolean>(false);
  ready$: Observable<boolean> = this._ready$.asObservable();

  // cultures
  cultures$: Observable<string[]> = this.http.get("/localization/getSelectableCultures").pipe(shareReplay());

  // define localization table
  dictionary: {}

  // new
  constructor(
    private http: AppHttpClientService
  ) {

    // initial build
    this.buildDictionary();
  }

  // build dioction
  buildDictionary() {

    // get the data
    this.http.get("/localization/getAllStrings").subscribe(x => {

      // clear, then populate
      this.dictionary = {};
      x.forEach(i => {
        this.dictionary[i.key] = i.text;
        if (this.localizationStore[i.key] == undefined) {
          this.localizationStore[i.key] = new BehaviorSubject<string>(i.text);
        } else {
          this.localizationStore[i.key].next(i.text);
        }
      });
    });
  }

  // get string
  getString(key: string) {

    // check if not cached
    if (this.localizationStore[key] == undefined) {
      this.localizationStore[key] = new BehaviorSubject<string>(key);
    }

    // return
    return this.localizationStore[key];
  }

  // set culture
  setCulture(culture: string) {
    window.localStorage.setItem("apps:culture", culture);
    this.buildDictionary();
  }

  // get culture
  getCulture = () => window.localStorage.getItem("apps:culture");
}
