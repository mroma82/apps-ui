import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutContextService {

  // title area
  pageTitle$ = new BehaviorSubject<string>("");  

  // set page title
  setTitle(title: string) {
    this.pageTitle$.next(title);    
  }

  constructor() { }
}
