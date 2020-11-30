import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutContextService {

  // title area
  appTitle$ = new BehaviorSubject<string>(null)
  pageTitle$ = new BehaviorSubject<string>(null);  

  // set app
  setApp(appTitle: string) {
    this.appTitle$.next(appTitle);
  }
  
  // set page title
  setTitle(title: string) {
    this.pageTitle$.next(title);    
  }

  constructor() { }
}
