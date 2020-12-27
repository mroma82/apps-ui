import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest } from 'rxjs';

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
    console.log(["setTitle", title]);
    this.pageTitle$.next(title);    
  }

  // new
  constructor(
    titleService: Title
  ) { 

    // setup window title
    combineLatest(this.appTitle$, this.pageTitle$).subscribe(([app, title]) => {
      titleService.setTitle(["Apps", app, title].filter(x => x !== null).join(" - "));
    });


  }
}
